const menuButton = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#nav-menu');

if (menuButton && navMenu) {
  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

const visitDisplay = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
  visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysPassed = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (daysPassed < 1) {
    visitDisplay.textContent = "Back so soon! Awesome!";
  } else if (daysPassed === 1) {
    visitDisplay.textContent = "You last visited 1 day ago.";
  } else {
    visitDisplay.textContent = `You last visited ${daysPassed} days ago.`;
  }
}

localStorage.setItem('lastVisit', now);

const url = 'data/discover.json';
const container = document.getElementById('discover-cards');

async function fetchItems() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayCards(data);
  } catch (error) {
    console.error('Error loading JSON:', error);
  }
}

function displayCards(items) {
  items.forEach((item, index) => {
    const card = document.createElement('section');
    card.classList.add('card');
    
    const loadingAttr = index < 2 ? '' : 'loading="lazy"';

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name} image" width="300" height="200" ${loadingAttr}>
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>
    `;
    container.appendChild(card);
  });
}

fetchItems();

const lastMod = document.getElementById('last-modified');
if (lastMod) {
  lastMod.textContent = document.lastModified;
}

const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}
