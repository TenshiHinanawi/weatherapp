async function getWeather() {
    const city = document.getElementById("city-input").value;
    const weatherInfoContainer = document.getElementById("weatherInfo");

    if (!city) {
        weatherInfoContainer.innerHTML = "Please enter a city name.";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        
        // Extracting relevant data from the response
        const weatherInfo = `
            <h3>Weather in ${data.name}, ${data.sys.country}</h3>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Feels Like: ${data.main.feels_like} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Cloudiness: ${data.clouds.all}%</p>
            <p>Pressure: ${data.main.pressure} hPa</p>
            ${data.rain ? `<p>Rain (last 1 hour): ${data.rain["1h"]} mm</p>` : ""}
        `;
        
        weatherInfoContainer.innerHTML = weatherInfo;
    } catch (error) {
        weatherInfoContainer.innerHTML = `Error: ${error.message}`;
    }
}

