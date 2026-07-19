# data

该目录仅记录简历部署约定，不存放公开 PDF。

GitHub Actions 构建 Astro 后，会从 private `mindorigin150/resume` 仓库注入：

- `main.pdf` → `dist/data/resume.pdf`
- `main_zh.pdf` → `dist/data/resume-zh.pdf`
