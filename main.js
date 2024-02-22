const form = document.querySelector("form");
const input = document.querySelector('#searchInput');
const submit = document.querySelector('#searchButton');
const apiKey = 'a238adf125f143c2aed150657241902';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = input.value;
    weatherdata(location);
})

async function weatherdata(location) {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}`);
    const data = await response.json();
    console.log(data);
    const weatherInfo = document.querySelector('#weatherInfo');
    if (data.error) {
        weatherInfo.innerHTML = '<p>Location not found. Please try again.</p>';
        return;
    }    
    
    const temperature = document.getElementById('switch').checked ? data.current.temp_f + ' F' : data.current.temp_c + ' C';
    const description = data.forecast.forecastday[0].day.condition.text;
    const iconCode = data.forecast.forecastday[0].day.condition.code;
    const iconUrl = data.forecast.forecastday[0].day.condition.icon;
    weatherInfo.innerHTML = `
        <p>Location: ${location}</p>
        <p>Temperature: ${temperature}°</p>
        <p>Description: ${description}</p>
        <img src="${iconUrl}" alt="${description}" class="weather-image">
   `;
   //change background color based on description of weather
   const container = document.querySelector('.container');
   container.style.backgroundColor = getBackgroundColor(description);
}

function getBackgroundColor(description) {
  switch (description.toLowerCase()) {
    case 'sunny':
      return '#87CEEB'; // sky blue
    case 'partly cloudy ':
    case 'few clouds':
    case 'scattered clouds':
    case 'broken clouds':    
    case 'patchy rain nearby':
      return '#87CEFA'; // light sky blue
    case 'shower rain':
    case 'rain':
    case 'thunderstorm':
    case 'moderate rain':
      return '#4682B4'; // steel blue
    case 'snow':
      return '#F0FFFF'; // azure
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
      return '#D3D3D3'; // light gray
    default:
      return '#FFFFFF'; // white
  }
}
