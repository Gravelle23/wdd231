const toggleButton = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggleButton.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

const lastModified = document.getElementById('last-modified');
if (lastModified) {
  lastModified.textContent = document.lastModified;
}

document.addEventListener("DOMContentLoaded", () => {
  const visitDisplay = document.querySelector("#visit-count");

  let count = Number(localStorage.getItem("visit-count")) || 0;
  count++;
  localStorage.setItem("visit-count", count);

  if (visitDisplay) {
    visitDisplay.textContent = `You've visited this page ${count} time${count === 1 ? '' : 's'}.`;
  }
});

