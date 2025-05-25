window.addEventListener('load', () => {
  const menuButton = document.querySelector('#mybutton');
  const menuLinks = document.querySelector('.menuLinks');

  menuButton.addEventListener('click', () => {
    menuLinks.classList.toggle('open');
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const lastMod = document.getElementById('last-modified');
  if (lastMod) lastMod.textContent = document.lastModified;

  getMemberData();
  getWeather();
});

const url = 'data/members.json';
const SPOTLIGHT_CONTAINER = document.querySelector('#spotlight');
const CURRENT_WEATHER = document.querySelector('#current-weather');
const FORECAST = document.querySelector('#forecast');

const myKey = 'b4eef9ff5bbbc0a675dd5b58c1d43737';
const latitude = 38.30;
const longitude = -76.51;

async function getMemberData() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch members: ${response.status}`);
    const members = await response.json();
    displaySpotlight(members);
  } catch (error) {
    console.error('Error fetching member data:', error);
  }
}

function displaySpotlight(members) {
  SPOTLIGHT_CONTAINER.innerHTML = '';
  const eligible = members.filter(m => {
    const level = parseInt(m.membership_level);
    return level === 2 || level === 3;
  });

  for (let i = eligible.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
  }

  const spotlightMembers = eligible.slice(0, 3);

  spotlightMembers.forEach(m => {
    const card = document.createElement('section');
    card.classList.add('spotlight-card');

    card.innerHTML = `
      <h3>${m.name}</h3>
      <img src="images/${m.image}" alt="Logo of ${m.name}" loading="lazy" width="200" />
      <p><strong>Phone:</strong> ${m.phone}</p>
      <p><strong>Address:</strong> ${m.address}</p>
      <p><strong>Membership:</strong> ${m.membership_level === "3" ? "Gold" : "Silver"}</p>
      <a href="https://${m.website}" target="_blank">Visit Website</a>
      <p>${m.description}</p>
    `;

    SPOTLIGHT_CONTAINER.appendChild(card);
  });
}

async function getWeather() {
  try {
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${myKey}`;
    const response = await fetch(weatherURL);
    if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
    const data = await response.json();

    displayCurrentWeather(data);
    displayForecast(data);
  } catch (error) {
    console.error('Weather fetch failed:', error);
    CURRENT_WEATHER.textContent = 'Weather data unavailable.';
  }
}

function displayCurrentWeather(data) {
  const current = data.list[0];
  const temp = current.main.temp.toFixed(1);
  const desc = current.weather[0].description;

  CURRENT_WEATHER.innerHTML = `
    <p><strong>Temperature:</strong> ${temp} °F</p>
    <p><strong>Conditions:</strong> ${desc}</p>
  `;
}

function displayForecast(data) {
  const forecastByDay = {};

  data.list.forEach(item => {
    if (item.dt_txt.includes("18:00:00")) {
      const date = new Date(item.dt_txt);
      const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
      forecastByDay[dayName] = item.main.temp.toFixed(1);
    }
  });

  let forecastHTML = '<h3>3-Day Forecast</h3><ul>';
  let count = 0;
  for (const [day, temp] of Object.entries(forecastByDay)) {
    forecastHTML += `<li><strong>${day}:</strong> ${temp} °F</li>`;
    count++;
    if (count >= 3) break;
  }
  forecastHTML += '</ul>';

  FORECAST.innerHTML = forecastHTML;
}
