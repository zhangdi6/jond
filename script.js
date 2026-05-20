const projects = [
  {
    name: "Habit Flow",
    year: "2026",
    subtitle: "习惯管理与复盘应用",
    description:
      "面向个人成长场景，提供习惯追踪、周复盘、提醒通知与数据趋势分析，重点优化低压力打卡体验。",
    tags: ["iOS", "Swift", "Health", "CloudKit"],
    stores: [
      { label: "App Store", url: "https://apps.apple.com/app/id0000000000" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.example.habitflow" },
    ],
  },
  {
    name: "Pocket Ledger",
    year: "2025",
    subtitle: "轻量记账工具",
    description:
      "为自由职业者设计的收支记录工具，支持分类预算、月度报表、票据备注与多设备同步。",
    tags: ["React", "TypeScript", "PWA", "Charts"],
    stores: [
      { label: "App Store", url: "https://apps.apple.com/app/id1111111111" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.example.ledger" },
    ],
  },
  {
    name: "Focus Desk",
    year: "2024",
    subtitle: "专注计时与任务工作台",
    description:
      "将番茄钟、任务分组、白噪音与桌面小组件整合到一个安静的工作流里，适合高频使用。",
    tags: ["macOS", "SwiftUI", "Widgets", "Productivity"],
    stores: [
      { label: "Mac App Store", url: "https://apps.apple.com/app/id2222222222" },
      { label: "产品主页", url: "https://example.com/focus-desk" },
    ],
  },
];

const projectGrid = document.querySelector("#project-grid");

if (projectGrid) {
  projectGrid.innerHTML = projects
    .map(
      (project) => `
      <article class="project-card">
        <div class="project-media">
          <span class="project-year">${project.year}</span>
          <strong>${project.subtitle}</strong>
        </div>
        <div class="project-body">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="tag-row" aria-label="${project.name} 技术标签">
            ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
          <div class="store-row" aria-label="${project.name} 应用商店地址">
            ${project.stores
              .map(
                (store) =>
                  `<a href="${store.url}" target="_blank" rel="noreferrer">${store.label}</a>`
              )
              .join("")}
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = [...document.querySelectorAll(".site-nav a")];

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "打开导航");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navById = new Map(navLinks.map((link) => [link.getAttribute("href").slice(1), link]));

if (sections.length > 0 && navLinks.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.remove("active"));
        navById.get(entry.target.id)?.classList.add("active");
      });
    },
    { rootMargin: "-42% 0px -50% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
