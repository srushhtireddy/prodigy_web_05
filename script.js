const apiKey = 'cd36ef62cba52fe532f71d8c7297c934'; // <-- Replace this with your OpenWeatherMap API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  } else {
    weatherInfo.innerHTML = `<p>Please enter a city name.</p>`;
  }
});

function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="${desc}" />
        <p><strong>${temp}°C</strong></p>
        <p>${desc}</p>
      `;
    })
    .catch(error => {
      weatherInfo.innerHTML = `<p>${error.message}</p>`;
    });
}
