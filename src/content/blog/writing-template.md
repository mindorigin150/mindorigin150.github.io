---
title: "Post title"
description: "A one-sentence description for the Blog index and RSS feed."
publishedAt: 2026-07-18
tags:
  - research
# Optional social-sharing image; uncomment after adding the file under public/images/blog/.
# cover: /images/blog/article-slug/cover.webp
draft: true
featured: false
---

This file is excluded from production routes and feeds while `draft` is `true`. It remains visible in the public repository and must not contain sensitive material.

## Section heading

Write in standard Markdown. Inline mathematics such as $a_t \sim \pi(\cdot \mid s_t)$ and display equations are supported:

$$
\mathcal{L}(\theta) = \mathbb{E}_{(x,y) \sim \mathcal{D}}[-\log p_\theta(y \mid x)].
$$

```python
def evaluate(policy, environment):
    return environment.rollout(policy)
```

## Images

Store local images under `public/images/blog/`, with one directory per article. Use the Markdown filename as the directory name when possible:

```text
src/content/blog/article-slug.md

public/images/blog/article-slug/
├── cover.webp
├── overview.webp
└── architecture.png
```

Insert a normal image with an absolute path beginning at `/images/`:

```markdown
![A concise description of the image](/images/blog/article-slug/overview.webp)
```

For an image with a caption, use an HTML figure:

```html
<figure>
  <img
    src="/images/blog/article-slug/architecture.png"
    alt="A concise description of the architecture"
    loading="lazy"
  />
  <figcaption>
    Figure 1. A short explanation of what the figure shows.
  </figcaption>
</figure>
```

To use an image for social sharing, uncomment and update the `cover` field in the frontmatter:

```yaml
cover: /images/blog/article-slug/cover.webp
```

The cover is not inserted into the article body automatically. Add it again with Markdown if it should also appear in the article.

Prefer WebP for photographs and general illustrations; PNG or SVG are suitable for diagrams. Use lowercase, hyphenated filenames, keep paths case-exact, and write meaningful alt text. Do not include `public` in the URL: use `/images/...`, not `/public/images/...`.
