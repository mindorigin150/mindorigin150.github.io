import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, extname, join, relative, resolve } from 'node:path';
import { XMLParser } from 'fast-xml-parser';
import { parse as parseYaml } from 'yaml';

const dist = resolve('dist');
const requireResumes = process.argv.includes('--require-resumes');
const problems = [];

const requiredFiles = [
  'index.html',
  '404.html',
  'research/index.html',
  'blog/index.html',
  'rss.xml',
  'sitemap-index.xml',
  'sitemap-0.xml',
  'favicon.svg',
  'robots.txt',
  'images/profile.jpg',
];

if (requireResumes) {
  requiredFiles.push('data/resume.pdf', 'data/resume-zh.pdf', '.nojekyll');
}

for (const file of requiredFiles) {
  if (!existsSync(join(dist, file))) problems.push(`Missing required build artifact: ${file}`);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function localCandidates(pathname) {
  const cleanPath = decodeURIComponent(pathname).replace(/^\//, '');
  const target = join(dist, cleanPath);
  const candidates = [target];

  if (pathname.endsWith('/')) candidates.push(join(target, 'index.html'));
  if (!extname(cleanPath)) candidates.push(`${target}.html`, join(target, 'index.html'));

  return candidates;
}

function asArray(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function parseXml(xml, label) {
  if (!xml) return {};

  try {
    return new XMLParser({ trimValues: true }).parse(xml);
  } catch (error) {
    problems.push(`${label} is malformed: ${error.message}`);
    return {};
  }
}

function pathname(value, label) {
  try {
    return decodeURIComponent(new URL(String(value), 'https://mindorigin150.github.io').pathname);
  } catch {
    problems.push(`Invalid URL in ${label}: ${value}`);
    return undefined;
  }
}

function compareRouteSets(expected, actual, label) {
  for (const route of expected) {
    if (!actual.has(route)) problems.push(`Published Blog post is missing from ${label}: ${route}`);
  }
  for (const route of actual) {
    if (!expected.has(route)) problems.push(`Unexpected Blog post appears in ${label}: ${route}`);
  }
}

if (existsSync(dist)) {
  const files = walk(dist);
  const textExtensions = new Set(['.html', '.xml', '.txt', '.css', '.js', '.svg']);
  const textFiles = files.filter((file) => textExtensions.has(extname(file)) && statSync(file).size < 1_000_000);

  for (const file of files.filter((path) => extname(path) === '.html')) {
    const html = readFileSync(file, 'utf8');

    if (!html.includes('<meta name="description"')) problems.push(`Missing description metadata: ${file}`);
    if (!html.includes('<link rel="canonical"')) problems.push(`Missing canonical metadata: ${file}`);

    for (const [, reference] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (['#', 'mailto:', 'http://', 'https://', '//'].some((prefix) => reference.startsWith(prefix))) continue;

      const url = new URL(reference, 'https://mindorigin150.github.io');
      if (!requireResumes && ['/data/resume.pdf', '/data/resume-zh.pdf'].includes(url.pathname)) continue;
      if (!localCandidates(url.pathname).some(existsSync)) {
        problems.push(`Missing local target ${reference} referenced by ${file}`);
      }
    }
  }

  const searchableOutput = textFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
  if (searchableOutput.includes('/notes/')) problems.push('Retired Notes route leaked into production output');

  const rss = existsSync(join(dist, 'rss.xml')) ? readFileSync(join(dist, 'rss.xml'), 'utf8') : '';
  const rssDocument = parseXml(rss, 'RSS output');
  if (!rssDocument.rss?.channel) problems.push('RSS output is not a channel document');
  const rssPaths = new Set(
    asArray(rssDocument.rss?.channel?.item)
      .map((item) => pathname(item.link, 'RSS'))
      .filter(Boolean),
  );

  const sitemap = existsSync(join(dist, 'sitemap-index.xml'))
    ? readFileSync(join(dist, 'sitemap-index.xml'), 'utf8')
    : '';
  const sitemapDocument = parseXml(sitemap, 'Sitemap index');
  if (!sitemapDocument.sitemapindex) problems.push('Sitemap index is missing its root element');

  const sitemapPages = existsSync(join(dist, 'sitemap-0.xml'))
    ? readFileSync(join(dist, 'sitemap-0.xml'), 'utf8')
    : '';
  const sitemapPagesDocument = parseXml(sitemapPages, 'Sitemap pages');
  const sitemapPaths = new Set(
    asArray(sitemapPagesDocument.urlset?.url)
      .map((entry) => pathname(entry.loc, 'sitemap'))
      .filter(Boolean),
  );
  if (!sitemapPaths.has('/blog/')) problems.push('Blog index is missing from the sitemap');

  for (const route of [...rssPaths, ...sitemapPaths]) {
    if (route === '/notes/' || route.startsWith('/notes/')) {
      problems.push(`Retired Notes route appears in feed metadata: ${route}`);
    }
  }

  const blogContent = resolve('src/content/blog');
  if (existsSync(blogContent)) {
    const posts = walk(blogContent).filter(
      (file) => extname(file) === '.md' && !basename(file).startsWith('_'),
    );
    const publishedRoutes = new Set();

    for (const post of posts) {
      const source = readFileSync(post, 'utf8');
      const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---/)?.[1];
      if (!frontmatter) {
        problems.push(`Blog post is missing YAML frontmatter: ${post}`);
        continue;
      }

      let data;
      try {
        data = parseYaml(frontmatter);
      } catch (error) {
        problems.push(`Invalid YAML frontmatter in ${post}: ${error.message}`);
        continue;
      }

      const draft = data?.draft === true;
      const slug = relative(blogContent, post).replaceAll('\\', '/').replace(/\.md$/, '');
      const route = `/blog/${slug}/`;
      const output = join(dist, 'blog', slug, 'index.html');
      const appearsInFeeds = rssPaths.has(route) || sitemapPaths.has(route);

      if (draft && (existsSync(output) || appearsInFeeds)) {
        problems.push(`Draft Blog post leaked into production output: ${route}`);
      }
      if (!draft) {
        publishedRoutes.add(route);
        if (!existsSync(output)) problems.push(`Published Blog post is missing its page: ${route}`);
      }
    }

    const rssBlogRoutes = new Set([...rssPaths].filter((route) => route.startsWith('/blog/')));
    const sitemapBlogRoutes = new Set(
      [...sitemapPaths].filter((route) => route.startsWith('/blog/') && route !== '/blog/'),
    );
    compareRouteSets(publishedRoutes, rssBlogRoutes, 'RSS');
    compareRouteSets(publishedRoutes, sitemapBlogRoutes, 'sitemap');
  }
}

if (problems.length > 0) {
  console.error(problems.join('\n'));
  process.exit(1);
}

console.log(`Verified ${requiredFiles.length} required artifacts, local links, metadata, RSS, sitemap, and draft isolation.`);
