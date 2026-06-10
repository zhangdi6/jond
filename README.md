# 张迪 Jond 个人网站

这是一个基于 Vite + React 的个人网站，首页首屏使用 `@shadergradient/react` 渲染动态 WebGL 背景。

## 开发

```bash
npm install
npm run dev
```

访问 `http://127.0.0.1:5173`。

## 构建

```bash
npm run build
```

构建产物会输出到 `dist/`。

## 内容位置

- 首页结构：`src/App.jsx`
- 项目数据：`src/data/projects.js`
- Shader 背景：`src/components/ShaderHero.jsx`
- 样式：`src/styles.css`
- 简历页：`public/resume.html`
- 视频封面：`public/video-poster.svg`

## 视频

把个人介绍视频放到 `public/intro.mp4` 后，可以在 `src/App.jsx` 的 `<video>` 内加入：

```html
<source src="/intro.mp4" type="video/mp4" />
```
