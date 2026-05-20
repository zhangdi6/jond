# Jond 个人网站

这是一个无需安装依赖的静态个人网站项目，包含：

- 个人信息
- 个人介绍短视频
- 开发项目与应用商店地址
- 简历展示与打印导出页面

## 打开方式

直接用浏览器打开 `index.html` 即可预览。

也可以启动本地静态服务：

```bash
python3 -m http.server 5173
```

然后访问 `http://localhost:5173`。

## 替换内容

- 修改 `index.html` 中的姓名、简介、邮箱、城市、经历和技能。
- 修改 `script.js` 中的 `projects` 数组，替换项目介绍、技术标签和应用商店地址。
- 将个人介绍视频放到 `assets/intro.mp4`，然后在 `index.html` 的视频区域取消 `<source src="./assets/intro.mp4" type="video/mp4" />` 这一行的注释。
- 修改 `resume.html` 中的完整简历内容，浏览器打开后可打印或导出 PDF。

## 文件结构

```text
.
├── assets/
│   ├── hero-visual.svg
│   └── video-poster.svg
├── index.html
├── resume.html
├── script.js
├── styles.css
└── README.md
```
