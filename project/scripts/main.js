const visitDisplay = document.getElementById("visit-count");
if (visitDisplay) {
  let count = Number(localStorage.getItem("visitCount")) || 0;
  count++;
  localStorage.setItem("visitCount", count);
  visitDisplay.textContent = `You have visited this page ${count} time(s).`;
}

const menuButton = document.querySelector('#menu-button');
const menuLinks = document.querySelector('.menuLinks');

if (menuButton && menuLinks) {
  menuButton.addEventListener('click', () => {
    menuLinks.classList.toggle('open');
  });
}
