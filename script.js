let sprinklerStatus = { is_on: false }; // Initial sprinkler status

document.getElementById('checkWeather').addEventListener('click', function () {
    const city = document.getElementById('city').value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    
    fetch(`http://127.0.0.1:5000/weather/${city}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            const body = document.body;

            if (data.error) {
                resultDiv.innerHTML = `<p>${data.error}</p>`;
                body.style.backgroundImage = "url('cloud.jpg')";
                sprinklerStatus.is_on = false; // Turn off if there's an error
                updateSprinklerStatus();
            } else {
                const isRainy = data.main === 'Rain' || data.description.includes('rain');

                // Change the background image based on the weather condition
                if (isRainy) {
                    body.style.backgroundImage = "url('R.jpg')";
                    sprinklerStatus.is_on = false; // Turn off if it's raining
                } else if (data.main === 'Clouds' && data.description.includes('broken clouds')) {
                    body.style.backgroundImage = "url('cloud.jpg')";
                } else {
                    body.style.backgroundImage = "url('OIP.jpg')";
                    sprinklerStatus.is_on = true; // Turn on if it's not raining
                }

                resultDiv.innerHTML = `<p>The weather in ${city} is: ${data.description}</p>`;
                updateSprinklerStatus();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.getElementById('toggleSprinkler').addEventListener('click', function () {
    // Toggle the sprinkler status
    sprinklerStatus.is_on = !sprinklerStatus.is_on; // Toggle status

    // Update the displayed status
    updateSprinklerStatus();

    // Optionally send the new status to the server (if needed)
    fetch('/toggle_sprinkler', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_on: sprinklerStatus.is_on })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sprinkler status updated:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Function to update sprinkler status display
function updateSprinklerStatus() {
    const sprinklerStatusDiv = document.getElementById('sprinklerStatus');
    if (sprinklerStatus.is_on) {
        sprinklerStatusDiv.innerHTML = '<p>The sprinkler is on.</p>';
    } else {
        sprinklerStatusDiv.innerHTML = '<p>The sprinkler is off.</p>';
    }
}

