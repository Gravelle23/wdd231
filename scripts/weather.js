const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const myKey = "b4eef9ff5bbbc0a675dd5b58c1d43737"
const myLat = "49.75"
const myLong = "6.64"

const url = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data); 
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

apiFetch();

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`; 
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`; 
  let desc = data.weather[0].description; 
  
  weatherIcon.setAttribute('src', iconsrc); 
  weatherIcon.setAttribute('alt', desc); 
  captionDesc.textContent = `${desc}`; 
}
