# Personal Homepage Template

这是一个轻量个人主页模板，已经清除了原始示例人物的论文、图片、视频和项目页内容。

## 常用修改位置

- `index.html`：主页内容。文件里有中文 `TODO` 注释，按注释替换姓名、简介、邮箱、链接、项目/论文、教育和经历。
- `stylesheet.css`：页面样式。只改内容时通常不用动。
- `images/`：头像和项目图片。默认有 `images/profile.svg` 作为占位头像。
- `data/`：非图片资料目录。部署时 GitHub Actions 会把 private `mindorigin150/resume` 仓库里的 `main.pdf` 复制成 `data/resume.pdf`。
- `.github/workflows/pages.yml`：GitHub Pages 部署 workflow。

## 简历来源

主页里的 CV 链接是：

```html
<a href="data/resume.pdf">CV</a>
```

`data/resume.pdf` 不直接提交到本仓库；它会在 GitHub Actions 部署时从 private resume 仓库复制到最终 Pages 产物里。这样只需要维护一份 resume 源码。

部署前需要配置两个 secret：

1. 在 public 主页仓库中添加 Actions secret：

```text
RESUME_DEPLOY_KEY
```

这个 secret 应该是能只读访问 `mindorigin150/resume` 的 SSH deploy key private key。

2. 在 private `mindorigin150/resume` 仓库中添加 Actions secret：

```text
HOMEPAGE_ACTIONS_TOKEN
```

这个 secret 应该是一个能触发 `mindorigin150/mindorigin150.github.io` workflow 的 token，至少需要目标主页仓库的 `Actions: Read and write` 权限。

`resume` 仓库里的 `.github/workflows/deploy-homepage.yml` 会在 `main/master` 分支 push 后自动触发本仓库的 Pages 部署 workflow。

## 本地预览

直接用浏览器打开 `index.html` 即可。此时 CV 链接可能不存在，因为 `data/resume.pdf` 是部署时生成的产物。
