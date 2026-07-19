export const siteConfig = {
  name: 'Xinyuan Li',
  title: 'Xinyuan Li — Multimodal AI & Robot Learning',
  description:
    'Junior undergraduate at Zhejiang University researching multimodal foundation models, reinforcement learning, real-time VLA evaluation, and efficient AI systems.',
  url: 'https://mindorigin150.github.io',
  email: 'xinyuanli2327@outlook.com',
  keywords: [
    'Xinyuan Li',
    'Zhejiang University',
    'Multimodal Foundation Models',
    'Reinforcement Learning',
    'Real-Time VLA Evaluation',
    'Efficient AI Systems',
  ],
  profileLinks: [
    { label: 'Email', href: 'mailto:xinyuanli2327@outlook.com' },
    { label: 'CV', href: '/data/resume.pdf' },
    { label: 'CV (中文)', href: '/data/resume-zh.pdf' },
    {
      label: 'Scholar',
      href: 'https://scholar.google.com/citations?view_op=list_works&hl=en&user=yOI3ZtEAAAAJ',
    },
    { label: 'GitHub', href: 'https://github.com/mindorigin150' },
    { label: 'Blog', href: '/blog/' },
  ],
  interests: [
    {
      title: 'Multimodal Foundation Models & World Action Models (WAMs)',
      description: 'Exploring VLMs, UMMs, VLAs, and WAMs for perception, reasoning, world modeling, and action.',
    },
    {
      title: 'Reinforcement Learning',
      description: 'Studying decision-making and policy learning in interactive environments.',
    },
    {
      title: 'Efficient AI Systems',
      description:
        'Building GPU/CUDA environment acceleration, KV streaming cache, FlexAttention masks, and training/inference optimizations.',
    },
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
    'https://scholar.google.com/citations?view_op=list_works&hl=en&user=yOI3ZtEAAAAJ',
  ],
} as const;
