(function () {
  let P = PROFILE;
  let $ = function (id) { return document.getElementById(id); };

  function el(tag, opts, text) {
    let node = document.createElement(tag);
    if (opts) {
      Object.keys(opts).forEach(function (k) { node.setAttribute(k, opts[k]); });
    }
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function link(href, label, className) {
    let a = el("a", { href: href, class: className || "" }, label);
    if (/^https?:/.test(href)) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
    return a;
  }

  function projectBtn(href, label, cls) {
    if (!href) {
      return el("span", { class: cls + " is-disabled", "aria-disabled": "true" }, label);
    }
    return link(href, label, cls);
  }

  /* ---------- Fill the page from PROFILE ---------- */
  document.title = P.name + " | " + P.title;
  $("logo").textContent = P.name;
  $("hero-name").textContent = P.name;
  $("hero-title").textContent = P.title;
  $("hero-tagline").textContent = P.tagline;
  $("footer-name").textContent = "\u00A9 " + new Date().getFullYear() + " " + P.name;

  P.about.forEach(function (text) {
    $("about-text").appendChild(el("p", null, text));
  });

  P.details.forEach(function (d) {
    let row = el("div");
    row.appendChild(el("dt", null, d.label));
    row.appendChild(el("dd", null, d.value));
    $("details").appendChild(row);
  });

  P.skills.forEach(function (s) {
    $("skills-list").appendChild(el("li", null, s));
  });

  P.projects.forEach(function (p) {
    let card = el("article", { class: "card project" });
    card.appendChild(el("h3", null, p.title));
    card.appendChild(el("p", null, p.description));
    let links = el("div", { class: "project-links" });
    links.appendChild(projectBtn(p.live, "Live demo", "btn btn-primary btn-sm"));
    links.appendChild(projectBtn(p.code, "Repository", "btn btn-ghost btn-sm"));
    card.appendChild(links);
    $("projects-grid").appendChild(card);
  });

  $("contact-text").textContent = P.contact.text;
  let box = $("contact-links");
  if (P.contact.email) { box.appendChild(link(P.contact.email, "Email me", "btn btn-primary")); }
  if (P.contact.github) box.appendChild(link(P.contact.github, "GitHub", "btn btn-ghost"));
  if (P.contact.linkedin) box.appendChild(link(P.contact.linkedin, "LinkedIn", "btn btn-ghost"));

  /* ---------- Theme toggle ---------- */
  let root = document.documentElement;
  let toggle = $("theme-toggle");

  function syncToggleLabel() {
    let isDark = root.getAttribute("data-theme") === "dark";
    toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  }
  syncToggleLabel();

  toggle.addEventListener("click", function () {
    let next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { }
    syncToggleLabel();
  });

  /* ---------- Mobile menu ---------- */
  let nav = $("nav");
  let menuBtn = $("menu-btn");

  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  menuBtn.addEventListener("click", function () {
    setMenu(!nav.classList.contains("open"));
  });
  $("menu").addEventListener("click", function (e) {
    if (e.target.tagName === "A") setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 720) setMenu(false);
  });

  /* ---------- Hero floating dots ---------- */
  (function () {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    var host = document.getElementById("hero-bg");
    var count = window.innerWidth < 720 ? 10 : 18;

    for (var i = 0; i < count; i++) {
      var dot = document.createElement("span");
      dot.className = "dot";
      var size = 4 + Math.random() * 10;
      dot.style.width = size + "px";
      dot.style.height = size + "px";
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = Math.random() * 100 + "%";
      dot.style.animationDuration = 14 + Math.random() * 12 + "s";
      dot.style.animationDelay = (Math.random() * -20) + "s";
      host.appendChild(dot);
    }
  })();
})();
