// Nilo Materiais para Construção — demonstração conceitual.
const CONFIG = {
  whatsappNumber: "", // Exemplo: 5512999999999 (somente números)
  defaultMessage: "Olá! Gostaria de solicitar um orçamento."
};
const MOBILE_NAV_BREAKPOINT = 860; // manter igual ao @media (max-width: 860px) do CSS
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Contato / WhatsApp ---------- */
const toast = document.querySelector("#toast");
let toastTimer;
function notify(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
}
function contact(message = CONFIG.defaultMessage) {
  const number = CONFIG.whatsappNumber.replace(/\D/g, "");
  if (!number) {
    notify("O WhatsApp oficial será configurado após a confirmação dos dados da empresa.");
    return;
  }
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}
document.querySelectorAll(".js-contact").forEach(button => button.addEventListener("click", () => contact()));
document.querySelectorAll("[data-category]").forEach(link => {
  link.addEventListener("click", () => contact(`Olá! Gostaria de consultar produtos da categoria: ${link.dataset.category}.`));
});

/* ---------- Menu mobile ---------- */
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");
function closeMenu() {
  if (!toggle || !nav) return;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menu");
  nav.classList.remove("open");
}
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const opened = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!opened));
    toggle.setAttribute("aria-label", opened ? "Abrir menu" : "Fechar menu");
    nav.classList.toggle("open", !opened);
  });
  nav.querySelectorAll("a, .js-contact").forEach(item => item.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => { if (window.innerWidth > MOBILE_NAV_BREAKPOINT) closeMenu(); });
}

/* ---------- Trilho horizontal de categorias ---------- */
const rail = document.querySelector("#rail");
const prev = document.querySelector('[data-rail="prev"]');
const next = document.querySelector('[data-rail="next"]');
if (rail && prev && next) {
  const controls = prev.parentElement;
  const GAP = 4;
  const step = () => {
    const tile = rail.querySelector(".tile");
    return tile ? (tile.getBoundingClientRect().width + GAP) * 2 : rail.clientWidth * 0.8;
  };
  const update = () => {
    const max = rail.scrollWidth - rail.clientWidth - 1;
    controls.hidden = max <= 0;                // sem overflow, sem setas
    prev.disabled = rail.scrollLeft <= 0;
    next.disabled = rail.scrollLeft >= max;
  };
  const go = direction => rail.scrollBy({ left: direction * step(), behavior: reduceMotion ? "auto" : "smooth" });
  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));
  rail.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("load", update);
  update();
}

/* ---------- Rodapé ---------- */
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
