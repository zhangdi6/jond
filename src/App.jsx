import { lazy, Suspense, useEffect } from "react";
import { projects } from "./data/projects.js";

const ShaderHero = lazy(() => import("./components/ShaderHero.jsx"));

function shouldUseStaticBackground() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const smallViewport = window.matchMedia("(max-width: 760px)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const android = /Android/i.test(navigator.userAgent);
  const memory = navigator.deviceMemory ?? Number.POSITIVE_INFINITY;
  const cores = navigator.hardwareConcurrency ?? Number.POSITIVE_INFINITY;
  const constrainedDevice = memory <= 4 || cores <= 4;

  return reduceMotion || (android && smallViewport) || (smallViewport && coarsePointer && constrainedDevice);
}

function GlobalBackground() {
  const staticBackground = shouldUseStaticBackground();

  return (
    <div className={`global-backdrop${staticBackground ? " is-static" : ""}`} aria-hidden="true">
      {staticBackground ? (
        <div className="shader-fallback" aria-hidden="true" />
      ) : (
        <Suspense fallback={<div className="shader-fallback" aria-hidden="true" />}>
          <ShaderHero />
        </Suspense>
      )}
      <div className="global-shade" />
    </div>
  );
}

function Header() {
  const toggleNav = () => {
    document.body.classList.toggle("nav-open");
  };

  const closeNav = () => {
    document.body.classList.remove("nav-open");
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到首页" onClick={closeNav}>
          <span className="brand-mark" aria-hidden="true">
            J
          </span>
          <span>Jond</span>
        </a>
        <nav className="site-nav" aria-label="主导航">
          <a href="#profile" onClick={closeNav}>
            关于
          </a>
          <a href="#video" onClick={closeNav}>
            短片
          </a>
          <a href="#projects" onClick={closeNav}>
            项目
          </a>
          <a href="#resume" onClick={closeNav}>
            简历
          </a>
        </nav>
      </header>
      <button className="nav-toggle" type="button" aria-label="打开导航" onClick={toggleNav}>
        <span />
        <span />
        <span />
      </button>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span aria-hidden="true" />
            Independent mobile maker
          </p>
          <h1 id="hero-title">张迪 Jond</h1>
          <p className="hero-lede">
            我把年轻人的社交灵感，设计、开发、发布成真正能上线的移动产品。
          </p>
        </div>

        <div className="hero-showcase" aria-label="代表应用预览">
          <div className="phone-collage">
            {projects.map((project, index) => (
              <article
                className={`phone-preview phone-preview-${index + 1}`}
                style={{
                  "--project-accent": project.accent,
                  "--project-soft": project.accentSoft,
                  "--project-label": project.labelBg,
                  "--project-label-ink": project.labelInk,
                }}
                key={project.name}
              >
                <img className="phone-shot" src={project.screenshot} alt={`${project.name} 应用截图`} />
                <div className="phone-label">
                  <img src={project.logo} alt="" aria-hidden="true" />
                  <span>{project.name}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

function Profile() {
  return (
    <section className="section profile-section" id="profile" aria-labelledby="profile-title">
      <div className="section-head split-head">
        <h2 id="profile-title">关于我</h2>
      </div>

      <div className="profile-board">
        <article className="profile-copy fresh-panel">
          <span className="panel-tag">Product minded</span>
          <h3>我更像一个会写代码的产品合伙人。</h3>
          <p>
            熟悉从需求梳理、原型设计、前端实现到应用发布的完整流程。新颖潮流是我热爱的产品风格，清晰稳定是我不变的工程准则。
          </p>
        </article>

        <div className="profile-facts" aria-label="个人信息标签">
          {[
            { label: "00 后独立开发者" },
            { label: "6 款社交产品经验" },
            { label: "iOS / Android / Web" },
            { label: "张迪" },
            { label: "北京，可远程协作" },
            { label: "ENFJ" },
            { label: "移动应用 / Web 产品" },
            { label: "2574117580@qq.com", href: "mailto:2574117580@qq.com" },
            { label: "17630360083", href: "tel:17630360083" },
            { label: "开放合作与机会" },
          ].map((item) => (
            item.href ? (
              <a className="fact-chip" href={item.href} key={item.label}>
                {item.label}
              </a>
            ) : (
              <span className="fact-chip" key={item.label}>
                {item.label}
              </span>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="section video-section" id="video" aria-labelledby="video-title">
      <div className="video-layout">
        <div className="video-copy">
          <span className="panel-tag">Intro video</span>
          <h2 id="video-title">用 60 秒认识我的工作方式。</h2>
          <p>短片会更直接地展示我是谁、做过什么项目，以及我如何把想法推进到上线。</p>
          <div className="video-points" aria-label="短片重点">
            <span>产品背景</span>
            <span>真实界面</span>
            <span>合作方式</span>
          </div>
        </div>
        <div className="video-frame fresh-panel">
          <video controls playsInline preload="none" poster="/video-poster.svg" aria-label="个人介绍短视频">
            你的浏览器不支持视频播放。
          </video>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-title">
      <div className="section-head split-head">
        <h2 id="projects-title">我开发过的项目</h2>
        <p>专注社交领域，6 款社交产品产出，多家即时通讯、RTC、直播接入经验。</p>
      </div>
      <div className="project-stack">
        {projects.map((project, index) => (
          <article
            className="project-card fresh-panel"
            style={{
              "--project-accent": project.accent,
              "--project-soft": project.accentSoft,
              "--project-card-bg": project.cardBg,
              "--project-card-ink": project.cardInk,
              "--project-card-muted": project.cardMuted,
              "--project-card-border": project.cardBorder,
              "--project-chip-bg": project.chipBg,
            }}
            key={project.name}
          >
            <div className="project-copy">
              <div className="project-heading">
                <img src={project.logo} alt={`${project.name} logo`} />
                <div>
                  <span>{project.year} · {project.role}</span>
                  <h3>{project.name}</h3>
                </div>
              </div>
              <p className="project-subtitle">{project.subtitle}</p>
              <p>{project.description}</p>
              <div className="tag-row" aria-label={`${project.name} 技术标签`}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="store-row" aria-label={`${project.name} 应用商店地址`}>
                {project.stores.map((store) => (
                  <a href={store.url} target="_blank" rel="noreferrer" key={store.label}>
                    {store.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="project-visual" aria-hidden="true">
              <div className="device-shell">
                <img src={project.screenshot} alt="" />
              </div>
              <div className="project-orbit">
                <span>0{index + 1}</span>
                <strong>{project.name}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section className="section resume-section" id="resume" aria-labelledby="resume-title">
      <div className="section-head split-head">
        <h2 id="resume-title">我的简历</h2>
        <p>用时间线展示经历，用能力矩阵补充技术栈，让招聘方或合作方能快速判断匹配度。</p>
      </div>

      <div className="resume-layout">
        <div className="timeline fresh-panel" aria-label="经历时间线">
          <article className="timeline-item">
            <time dateTime="2025">2025 至今</time>
            <h3>独立开发者</h3>
            <p>负责移动应用从立项、设计、开发、测试到上架的完整流程。</p>
          </article>
          <article className="timeline-item">
            <time dateTime="2022">2022 - 2025</time>
            <h3>前端 / 移动端工程师</h3>
            <p>参与商业产品迭代，重点负责交互体验、性能优化与组件体系建设。</p>
          </article>
          <article className="timeline-item">
            <time dateTime="2020">2020 - 2022</time>
            <h3>软件工程学习与项目实践</h3>
            <p>积累 Web、移动端、服务端基础能力，并完成多款可演示项目。</p>
          </article>
        </div>

        <div className="skill-panel fresh-panel">
          <span className="panel-tag">Stack</span>
          <h3>核心能力</h3>
          <div className="skill-list" aria-label="技能列表">
            <span>Java</span>
            <span>Kotlin</span>
            <span>Flutter</span>
            <span>Web</span>
            <span>Swift</span>
            <span>AI</span>
            <span>应用上架</span>
          </div>
          <a className="button primary full-width" href="/resume.html">
            打开完整简历
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <GlobalBackground />
      <div className="site-shell">
        <Header />
        <main>
          <Hero />
          <div data-reveal>
            <Profile />
          </div>
          <div data-reveal>
            <VideoSection />
          </div>
          <div data-reveal>
            <Projects />
          </div>
          <div data-reveal>
            <Resume />
          </div>
        </main>
        <footer className="site-footer">
          <p>© 2026 Jond. Built with care.</p>
          <a href="mailto:2574117580@qq.com">2574117580@qq.com</a>
        </footer>
      </div>
    </>
  );
}
