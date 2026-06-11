import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { projects } from "./data/projects.js";

const ShaderHero = lazy(() => import("./components/ShaderHero.jsx"));

const appIconItems = [
  { name: "遇见漂流瓶", icon: "/app-icons/遇见漂流瓶icon.png" },
  { name: "小星空", icon: "/app-icons/小星空logo.png" },
  { name: "岸号", icon: "/app-icons/岸号logo.png" },
  { name: "一起饭", icon: "/app-icons/一起饭icon.png" },
  { name: "伊商汇", icon: "/app-icons/伊商汇icon.png" },
  { name: "伊甸城", icon: "/app-icons/伊甸城icon.png" },
  { name: "喜欢的人", icon: "/app-icons/喜欢的人icon.png" },
  { name: "大鱼优品", icon: "/app-icons/大鱼优品icon.png" },
  { name: "央信真品", icon: "/app-icons/央信真品icon.png" },
  { name: "酸啵", icon: "/app-icons/酸啵icon.png" },
  { name: "PrPr", icon: "/app-icons/PrPr.png" },
];

const ORBIT_SPIN_MS = 34000;
const ORBIT_FOCUS_MS = 520;

function normalizeOrbitDelta(degrees) {
  return ((((degrees + 180) % 360) + 360) % 360) - 180;
}

function easeOutQuint(progress) {
  return 1 - Math.pow(1 - progress, 5);
}

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

function AppIconOrbit() {
  const stageRef = useRef(null);
  const rotationRef = useRef(0);
  const lastFrameRef = useRef(null);
  const focusAnimationRef = useRef(null);
  const pausedRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(null);

  const setOrbitRotation = (rotation) => {
    rotationRef.current = rotation;

    if (!stageRef.current) return;
    stageRef.current.style.setProperty("--orbit-rotation", `${rotation}deg`);
    stageRef.current.style.setProperty("--orbit-counter-rotation", `${-rotation}deg`);
  };

  useEffect(() => {
    pausedRef.current = hoveredIndex !== null;
  }, [hoveredIndex]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reduceMotionRef.current = motionQuery.matches;
    };
    let frameId;

    updateMotionPreference();
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", updateMotionPreference);
    } else {
      motionQuery.addListener(updateMotionPreference);
    }

    const tick = (now) => {
      const focusAnimation = focusAnimationRef.current;

      if (focusAnimation) {
        const progress = Math.min(1, (now - focusAnimation.startedAt) / ORBIT_FOCUS_MS);
        setOrbitRotation(focusAnimation.start + focusAnimation.delta * easeOutQuint(progress));

        if (progress >= 1) {
          focusAnimationRef.current = null;
        }
      } else if (!pausedRef.current && !reduceMotionRef.current) {
        const elapsed = lastFrameRef.current ? now - lastFrameRef.current : 0;
        setOrbitRotation(rotationRef.current - (elapsed / ORBIT_SPIN_MS) * 360);
      }

      lastFrameRef.current = now;
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener("change", updateMotionPreference);
      } else {
        motionQuery.removeListener(updateMotionPreference);
      }
    };
  }, []);

  const focusItem = (index) => {
    const itemAngle = (index * 360) / appIconItems.length;
    const rotationDelta = normalizeOrbitDelta(-(itemAngle + rotationRef.current));

    setFocusedIndex(index);

    if (reduceMotionRef.current) {
      focusAnimationRef.current = null;
      setOrbitRotation(rotationRef.current + rotationDelta);
      return;
    }

    focusAnimationRef.current = {
      start: rotationRef.current,
      delta: rotationDelta,
      startedAt: performance.now(),
    };
  };

  const releaseFocusFromEmptySpace = (event) => {
    if (!event.target.closest(".app-orbit-item")) {
      setFocusedIndex(null);
    }
  };

  const activateHover = (index) => {
    setHoveredIndex(index);
    setFocusedIndex((current) => (current !== null && current !== index ? null : current));
  };

  const releaseHover = (index) => {
    setHoveredIndex((current) => (current === index ? null : current));
    setFocusedIndex((current) => (current === index ? null : current));
  };

  return (
    <div className="app-orbit-showcase" aria-labelledby="app-orbit-title">
      <div className="app-orbit-head">
        <h3 id="app-orbit-title">全部产品</h3>
      </div>
      <div
        className={`app-orbit-stage${focusedIndex !== null ? " is-focus-locked" : ""}`}
        style={{ "--item-count": appIconItems.length }}
        aria-label="已开发应用图标轮播"
        ref={stageRef}
        onPointerDown={releaseFocusFromEmptySpace}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setFocusedIndex(null);
          }
        }}
      >
        <div className="app-orbit-ring">
          {appIconItems.map((app, index) => (
            <button
              className={`app-orbit-item${hoveredIndex === index ? " is-hovered" : ""}${focusedIndex === index ? " is-active" : ""}`}
              style={{
                "--angle": `${(index * 360) / appIconItems.length}deg`,
                "--counter-angle": `${(-index * 360) / appIconItems.length}deg`,
                "--float-delay": `${index * -0.35}s`,
              }}
              aria-label={app.name}
              aria-pressed={focusedIndex === index}
              type="button"
              onPointerEnter={() => activateHover(index)}
              onPointerLeave={() => releaseHover(index)}
              onFocus={() => activateHover(index)}
              onBlur={() => releaseHover(index)}
              onClick={() => focusItem(index)}
              key={app.name}
            >
              <div className="app-orbit-card">
                <img src={app.icon} alt="" aria-hidden="true" />
                <strong>{app.name}</strong>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
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
      <AppIconOrbit />
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
