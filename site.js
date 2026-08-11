const site = document.querySelector(".site");
const photo = document.querySelector(".profile-photo");
const themeColor = document.querySelector('meta[name="theme-color"]');
const toggle = document.querySelector(".mushroom-toggle");
const sectionButtons = [...document.querySelectorAll("[data-section]")];
const pages = [...document.querySelectorAll("[data-page]")];
const validSections = new Set(["about", "publications", "teaching"]);

function setTheme(night) {
  site.classList.toggle("night", night);
  site.classList.toggle("forest", !night);
  photo.src = "assets/wenyi-profile.jpeg";
  toggle.setAttribute("aria-label", night ? "Enter the forest theme" : "Enter the night theme");
  toggle.title = night ? "Enter the forest" : "Enter the night";
  themeColor.content = night ? "#050713" : "#f4f8f3";
  window.localStorage.setItem("wenyi-world", night ? "night" : "forest");
}

function showSection(section, updateHistory = true) {
  const next = validSections.has(section) ? section : "about";
  pages.forEach((page) => { page.hidden = page.id !== next; });
  sectionButtons.forEach((button) => {
    const active = button.dataset.section === next;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  site.classList.toggle("about-active", next === "about");
  if (updateHistory) {
    const target = next === "about" ? window.location.pathname : `#${next}`;
    window.history.replaceState(null, "", target);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

toggle.addEventListener("click", () => setTheme(!site.classList.contains("night")));
sectionButtons.forEach((button) => button.addEventListener("click", () => showSection(button.dataset.section)));
window.addEventListener("hashchange", () => showSection(window.location.hash.slice(1), false));

const savedTheme = window.localStorage.getItem("wenyi-world");
const legacyTheme = window.localStorage.getItem("wenyi-daytime");
setTheme(savedTheme === "night" || (!savedTheme && legacyTheme === "night"));
showSection(window.location.hash.slice(1), false);
