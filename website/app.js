
const apiKey = 'ab39758c3e6328f086a5e85edf664f75&units=metric';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';

// Fetch weather data
const fetchWeatherData = async (zipCode) => {
  try {
    const response = await fetch(`${baseURL}?zip=${zipCode},us&appid=${apiKey}`);
    const data = await response.json();

    return data
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

// Post data to server
const postData = async (url, data) => {
  try {
    const response = await fetch(url,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    console.log('Data being posted:', data);

    return await response.json();
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

// Update UI
const updateUI = async () => {
  try {
    const response = await fetch('/all');
    const data = await response.json();
    document.getElementById('temp').innerHTML = `Temperature: ${Math.round(data.temp)}°C`;
    document.getElementById('date').innerHTML = `Date: ${data.date}`;
    document.getElementById('content').innerHTML = `Feelings: ${data.feel}`;
    document.getElementById('country').innerHTML = `Country: ${data.country}`;

  } catch (error) {
    console.error('Error updating UI:', error);
  }
};

// Main function triggered by the event listener
document.getElementById('generate').addEventListener('click', async () => {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  const date = new Date().toLocaleDateString();
  const entryHolder = document.getElementById('entryHolder').style.display='block';

  const weatherData = await fetchWeatherData(zipCode);

  if (weatherData) {
    await postData('/add', {
      temp: weatherData.main.temp,
      date,
      feel: feelings,
      country: weatherData.sys.country,
      
    });
    updateUI();
  } else {
    alert('Unable to fetch weather data. Please check the zip code.');
  }
});
