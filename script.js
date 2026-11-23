// Nilo Materiais para Construção — MVP conceitual.
// Insira o WhatsApp oficial após confirmação com a empresa.
const CONFIG = {
  whatsappNumber: "", // Formato: 5512999999999, somente números
  defaultMessage: "Olá! Gostaria de solicitar um orçamento."
};
const toast = document.querySelector("#toast");
let timer;
function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => toast.classList.remove("show"), 4200);
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
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");
function closeMenu() {
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menu");
  nav.classList.remove("open");
}
toggle.addEventListener("click", () => {
  const opened = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!opened));
  toggle.setAttribute("aria-label", opened ? "Abrir menu" : "Fechar menu");
  nav.classList.toggle("open", !opened);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
window.addEventListener("resize", () => { if (innerWidth > 700) closeMenu(); });
document.querySelector("#year").textContent = new Date().getFullYear();
