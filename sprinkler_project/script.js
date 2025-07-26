document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'ed3253d5484b6cecdff74814420d5093'; // Place your API key here
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=en&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Log the API response to the console
        console.log(data);

        if (data.cod === 200) {
            const weather = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;

            document.getElementById('weather').textContent = `Weather: ${weather}`;
            document.getElementById('temperature').textContent = `Temperature: ${temperature} °C`;
            document.getElementById('humidity').textContent = `Humidity: ${humidity} %`;

            updateBackground(weather);
        } else {
            alert('Please enter a valid city name.');
        }
    } catch (error) {
        console.error('Error fetching weather information:', error);
    }
}

function updateBackground(weather) {
    // Reset to a default background before applying the new one
    document.body.style.backgroundImage = "none";

    // Check for various weather conditions
    switch (true) {
        case weather.includes('rain'):
            document.body.style.backgroundImage = "url('R.jpg')";
            document.getElementById('sprinklerToggle').checked = false; 
            document.getElementById('toggle-status').textContent = 'Sprinkler is OFF';
            break;
        case weather.includes('clear') || weather.includes('sunny'):
            document.body.style.backgroundImage = "url('OIP.jpg')";
            document.getElementById('sprinklerToggle').checked = true; 
            document.getElementById('toggle-status').textContent = 'Sprinkler is ON';
            break;
        case weather.includes('cloud') || weather.includes('overcast'):
            document.body.style.backgroundImage = "url('cloud.jpg')";
            document.getElementById('sprinklerToggle').checked = true; 
            document.getElementById('toggle-status').textContent = 'Sprinkler is ON';
            break;
        default:
            document.body.style.backgroundColor = "#e8f5e9"; 
            document.getElementById('sprinklerToggle').checked = true; 
            document.getElementById('toggle-status').textContent = 'Sprinkler is ON';
    }
}
