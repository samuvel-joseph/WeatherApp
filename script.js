const apiKey = 'b06d77adb59cec57f87188b6f75f88bc'; // Replace with your OpenWeatherMap API key
const getWeatherButton = document.getElementById('getWeather');
const weatherResult = document.getElementById('weatherResult');

getWeatherButton.addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (city) {
        fetchWeather(city);
    } else {
        weatherResult.innerHTML = 'Please enter a city name.';
    }
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherResult.innerHTML = error.message;
        });
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description;

    weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Condition: ${description}</p>
    `;
}