const projects = [
  {
    name: "遇见漂流瓶",
    year: "2026",
    subtitle: "经典漂流瓶ip产品",
    description:
      "温暖的相遇，治愈的海洋，沉浸式体验",
    tags: ["iOS", "Android", "Harmony"],
    stores: [
      { label: "App Store", url: "https://apps.apple.com/app/id1454093306" },
      { label: "应用宝", url: "https://a.app.qq.com/o/simple.jsp?pkgname=com.innovation.driftbottle" },
    ],
  },
  {
    name: "小星空",
    year: "2025",
    subtitle: "轻量简约",
    description:
      "小清新的倾诉树洞应用",
    tags: ["Flutter", "Kotlin"],
    stores: [
      { label: "App Store", url: "https://apps.apple.com/app/id1588053931" },
      { label: "应用宝", url: "https://a.app.qq.com/o/simple.jsp?pkgname=com.qiyuan.sky" },
    ],
  },
  {
    name: "岸号",
    year: "2024",
    subtitle: "年轻人的潮流兴趣社交阵地",
    description:
      "一款线下社交应用，让社交回到现实，让关系自然发生。 潮向，由你而定。",
    tags: ["iOS", "Android", "Web"],
    stores: [
      { label: "App Store", url: "https://apps.apple.com/app/id6483942038" },
      { label: "应用宝", url: "https://a.app.qq.com/o/simple.jsp?pkgname=ad.anhao.uni" },
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
