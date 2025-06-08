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
  items.forEach((item) => {
    const card = document.createElement('section');
    card.classList.add('card');
    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure><img src="${item.image}" alt="${item.name} image" loading="lazy"></figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>
    `;
    container.appendChild(card);
  });
}

fetchItems();
