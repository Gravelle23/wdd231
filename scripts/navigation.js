document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");

  toggleButton.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
});
