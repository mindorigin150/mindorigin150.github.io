# Xinyuan Li — Personal Homepage

基于 [Astro](https://astro.build/) 的纯静态个人主页，包含首页、Research 索引、Blog 内容系统、RSS 和 GitHub Pages 自动部署。

## 本地开发

需要 Node.js 22.12 或更高版本。

```bash
npm ci
npm run dev
```

提交前运行：

```bash
npm run check
npm run build
npm run verify
```

生产产物输出到 `dist/`。

## 内容结构

- `src/pages/`：主页、Research、Blog、RSS 和 404 路由。
- `src/content/research/`：论文与项目 Markdown 条目。
- `src/content/blog/`：Blog Markdown；`draft: true` 的条目不会出现在生产页面或 RSS。
- `src/data/site.ts`：姓名、简介、联系方式、研究兴趣和经历。
- `src/styles/global.css`：颜色、字体、网格、文章排版和响应式规则。
- `public/images/`：头像及静态图片，部署后仍使用 `/images/...` URL。

Blog 支持 Markdown、代码高亮和 LaTeX 数学公式。`src/content/blog/writing-template.md` 是默认草稿模板。

## 简历来源

主页中的简历链接为：

```text
/data/resume.pdf
/data/resume-zh.pdf
```

PDF 不直接提交到本仓库。GitHub Actions 会从 private `mindorigin150/resume` 仓库读取 `main.pdf` 和 `main_zh.pdf`，并复制到最终 Astro 产物。

部署前需要配置两个 secret：

1. 在 public 主页仓库中添加 Actions secret：

```text
RESUME_DEPLOY_KEY
```

该 secret 应是能够只读访问 `mindorigin150/resume` 的 SSH deploy key private key。

2. 在 private `mindorigin150/resume` 仓库中添加 Actions secret：

```text
HOMEPAGE_ACTIONS_TOKEN
```

该 secret 应是能够触发 `mindorigin150/mindorigin150.github.io` workflow 的 token，至少需要目标主页仓库的 `Actions: Read and write` 权限。

`resume` 仓库里的 `.github/workflows/deploy-homepage.yml` 会在 `main/master` 分支 push 后自动触发本仓库的 Pages 部署 workflow。

本地预览时两个简历 URL 可能返回 404，因为 PDF 只在部署工作流中注入。
