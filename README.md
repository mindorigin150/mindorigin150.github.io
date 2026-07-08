# Personal Homepage Template

这是一个轻量个人主页模板，已经清除了原始示例人物的论文、图片、视频和项目页内容。

## 常用修改位置

- `index.html`：主页内容。文件里有中文 `TODO` 注释，按注释替换姓名、简介、邮箱、链接、项目/论文、教育和经历。
- `stylesheet.css`：页面样式。只改内容时通常不用动。
- `images/`：头像和项目图片。默认有 `images/profile.svg` 作为占位头像。
- `data/`：简历 PDF 等资料。默认 CV 链接是 `data/resume.pdf`。

## 本地预览

直接用浏览器打开 `index.html` 即可。

如果后续把简历仓库作为 Git submodule 管理，只需要把 `index.html` 中的 CV 链接改成 submodule 内 PDF 的相对路径。
