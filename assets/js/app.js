const ready = (fn) => {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

ready(() => {
  const body = document.body;
  const nav = document.querySelector(".site-header");
  const navLinks = document.querySelector(".nav-links");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const searchInput = document.querySelector("[data-search]");
  const postCards = document.querySelectorAll("[data-post-card]");

  const stored = localStorage.getItem("theme");
  if (stored) {
    body.dataset.theme = stored;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    body.dataset.theme = "dark";
  } else {
    body.dataset.theme = "light";
  }

  const updateThemeIcon = () => {
    if (!themeToggle) return;
    themeToggle.textContent = body.dataset.theme === "dark" ? "☀️" : "🌙";
  };

  const setTheme = (theme) => {
    body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    updateThemeIcon();
  };

  updateThemeIcon();

  themeToggle?.addEventListener("click", () => {
    const next = body.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
  });

  navToggle?.addEventListener("click", () => {
    navLinks?.classList.toggle("is-open");
  });

  window.addEventListener("scroll", () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 10);
  });

  if (searchInput && postCards.length) {
    searchInput.addEventListener("input", (ev) => {
      const term = ev.target.value.toLowerCase().trim();
      postCards.forEach((card) => {
        const text = card.dataset.title?.toLowerCase() ?? "";
        card.style.display = text.includes(term) ? "" : "none";
      });
    });
  }
});
