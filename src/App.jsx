import { lazy, Suspense, useEffect } from "react";
import { projects } from "./data/projects.js";

const ShaderHero = lazy(() => import("./components/ShaderHero.jsx"));

function GlobalBackground() {
  return (
    <div className="global-backdrop" aria-hidden="true">
      <Suspense fallback={<div className="shader-fallback" aria-hidden="true" />}>
        <ShaderHero />
      </Suspense>
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
    <header className="site-header">
      <a className="brand" href="#top" aria-label="回到首页" onClick={closeNav}>
        <span className="brand-mark" aria-hidden="true">
          J
        </span>
        <span>Jond</span>
      </a>
      <button className="nav-toggle" type="button" aria-label="打开导航" onClick={toggleNav}>
        <span />
        <span />
        <span />
      </button>
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
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-signal" aria-hidden="true">
        <span>Social Apps</span>
        <span>RTC</span>
        <span>AI Workflow</span>
      </div>
      <div className="hero-content">
        <p className="hero-kicker">Independent Developer · Beijing</p>
        <h1 id="hero-title">张迪 Jond</h1>
        <p className="hero-lede">把年轻人的社交想法，做成能上线、能增长、能持续迭代的产品。</p>
        <div className="hero-actions" aria-label="主要操作">
          <a className="button primary" href="#projects">
            查看项目
          </a>
          <a className="button secondary" href="/resume.html">
            查看简历
          </a>
        </div>
      </div>
      <div className="hero-meta" aria-label="个人亮点">
        <span>10+ 上线项目</span>
        <span>6+ 语言经验</span>
        <span>8+ AI 工具经验</span>
      </div>
    </section>
  );
}

function Profile() {
  return (
    <section className="section profile-section" id="profile" aria-labelledby="profile-title">
      <div className="section-head compact-head">
        <h2 id="profile-title">个人信息</h2>
        <p>00 后 / 北京 / ENFJ / 移动应用与 Web 产品开发</p>
      </div>

      <div className="profile-grid">
        <div className="profile-copy">
          <h3>产品型开发者，重视体验、设计、交付与长期维护。</h3>
          <p>
            熟悉从需求梳理、原型设计、前端实现到应用发布的完整流程。注重团队沟通协作，新颖潮流是我热爱的产品风格，优雅简约是我不变的代码准则。
          </p>
          <dl className="info-list">
            <div>
              <dt>姓名</dt>
              <dd>张迪</dd>
            </div>
            <div>
              <dt>方向</dt>
              <dd>移动应用 / Web 产品开发</dd>
            </div>
            <div>
              <dt>城市</dt>
              <dd>北京，可远程协作</dd>
            </div>
            <div>
              <dt>邮箱</dt>
              <dd>
                <a href="mailto:2574117580@qq.com">2574117580@qq.com</a>
              </dd>
            </div>
            <div>
              <dt>电话</dt>
              <dd>
                <a href="tel:17630360083">17630360083</a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="profile-statement">
          <p>
            我更像一个会写代码的产品合伙人：在社交场景里找情绪，在工程实现里找秩序。
          </p>
          <span>Product sense × Engineering clarity</span>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="section video-section" id="video" aria-labelledby="video-title">
      <div className="section-head">
        <h2 id="video-title">个人介绍短视频</h2>
        <p>用一段短片快速建立信任感，讲清楚你是谁、擅长什么、正在寻找怎样的合作机会。</p>
      </div>
      <div className="video-layout">
        <div className="video-frame">
          <video controls playsInline preload="none" poster="/video-poster.svg" aria-label="个人介绍短视频">
            你的浏览器不支持视频播放。
          </video>
        </div>
        <div className="video-notes">
          <h3>短片重点</h3>
          <ul>
            <li>30 秒讲清个人背景与技术方向。</li>
            <li>展示代表项目的真实界面和发布成果。</li>
            <li>收束到联系方式与合作方式。</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-title">
      <div className="section-head">
        <h2 id="projects-title">我开发过的项目</h2>
        <p>专注社交领域，6 款社交产品产出，多家即时通讯、RTC、直播接入经验。</p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article className={`project-card project-card-${index + 1}`} key={project.name}>
            <div className="project-media">
              <span className="project-year">{project.year}</span>
              <strong>{project.subtitle}</strong>
              <span className="project-index">0{index + 1}</span>
            </div>
            <div className="project-body">
              <h3>{project.name}</h3>
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
          </article>
        ))}
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section className="section resume-section" id="resume" aria-labelledby="resume-title">
      <div className="section-head">
        <h2 id="resume-title">我的简历</h2>
        <p>用时间线展示经历，用能力矩阵补充技术栈，让招聘方或合作方能快速判断匹配度。</p>
      </div>

      <div className="resume-layout">
        <div className="timeline" aria-label="经历时间线">
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

        <div className="skill-panel">
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
