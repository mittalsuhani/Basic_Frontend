const apiKey = "aad7cf1eea122f6c3a2140e11f75bd25"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherInfo = document.getElementById("weatherInfo");

  if (!city) {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    const { name } = data;
    const { temp, humidity } = data.main;
    const { description, icon } = data.weather[0];

    weatherInfo.innerHTML = `
      <h2>${name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
      <p><strong>Temperature:</strong> ${temp} °C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Condition:</strong> ${description}</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
