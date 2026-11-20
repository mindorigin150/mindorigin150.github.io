export const siteConfig = {
  name: 'Xinyuan Li',
  title: 'Xinyuan Li',
  description:
    'Senior undergraduate at Zhejiang University and Research Intern at Northwestern University working at the intersection of multimodal agents and efficient AI systems.',
  url: 'https://mindorigin150.github.io',
  email: 'xinyuanli2327@outlook.com',
  keywords: [
    'Xinyuan Li',
    'Zhejiang University',
    'Northwestern University',
    'Multimodal Agents',
    'Foundation Models',
    'Efficient AI Systems',
  ],
  profileLinks: [
    { label: 'Email', href: 'mailto:xinyuanli2327@outlook.com' },
    { label: 'CV', href: '/data/resume.pdf' },
    {
      label: 'Google Scholar',
      href: 'https://scholar.google.com/citations?view_op=list_works&hl=en&user=yOI3ZtEAAAAJ',
    },
    { label: 'GitHub', href: 'https://github.com/mindorigin150' },
    { label: 'X', href: 'https://x.com/xinyuanli_ai' },
  ],
  education: {
    institution: 'Zhejiang University',
    href: 'https://www.zju.edu.cn/english/',
    role: 'B.E. in Automation Engineering',
    detail: 'Minor in ACEE Honor Class of Chu Kochen College',
    date: 'Sep. 2023–Present',
  },
  experience: {
    institution: 'Northwestern University',
    href: 'https://www.northwestern.edu/',
    role: 'Research Intern',
    lab: 'MLL Lab',
    labHref: 'https://www.mll.lab.northwestern.edu/',
    detail: 'Advised by Prof. Manling Li',
    advisorHref: 'https://limanling.github.io/',
    date: 'Jul. 2025–Present',
  },
  sameAs: [
    'https://github.com/mindorigin150',
    'https://x.com/xinyuanli_ai',
    'https://scholar.google.com/citations?view_op=list_works&hl=en&user=yOI3ZtEAAAAJ',
  ],
} as const;
