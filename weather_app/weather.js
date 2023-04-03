//Select all Elements
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locElement = document.querySelector(".location p");
//
//Creating Object Property
let weather = {};
weather.temperature = {
   unit: "celsius",
}
//
//Api Response temp Value is in Kelvin
//then convert kelvin into Celsius
const kelvin = 273;
const apiKey = "810f63a0987e7a30642df2d648f8043d";
//userName=paulsimon227@gamil.com
//password:123456789

//
//Check if browser support geolocation
if ('geolocation' in navigator) {
   navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
   notificationElement.style.display = "block";
   notificationElement.innerHTML = `<p>Your Browser doesn't support Geolocation</p>`;
}

function setPosition(position) {
   let latitude = position.coords.latitude;
   let longitude = position.coords.longitude;
   getWeather(latitude, longitude);
}

function showError(error) {
   notificationElement.style.display = "block";
   notificationElement.innerHTML = `<p>${error.message}</p>`;
}

function getWeather(latitude, longitude) {
   let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

   //Request to website and response in JSON Format
   fetch(api)
      .then(function (response) {
         let data = response.json();
         return data;
      })
      .then(function (data) {
         weather.temperature.value = Math.floor(data.main.temp - kelvin);
         weather.description = data.weather[0].description;
         weather.iconId = data.weather[0].icon;
         weather.city = data.name;
         weather.country = data.sys.country;
      })
      .then(function () {
         displayWeather();
      })
}

//Display weather to the user Interface
function displayWeather() {
   iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
   tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
   descElement.innerHTML = `${weather.description}`;
   locElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//
//When the user click on tempElement then change into 
//celsius to fahrenheit and fahrenheit to celsius
function celsiusToFahrenheit(temperature) {
   return (temperature * 9 / 5) + 32;
}
tempElement.addEventListener('click', function () {
   if (weather.temperature.value === undefined)
      return;

   if (weather.temperature.unit === "celsius") {
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
      //can exist decimal number so used Math.floor 
      //Which ignore number after decimal
      fahrenheit = Math.floor(fahrenheit);
      tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
      weather.temperature.unit = "fahrenheit";
   } else {
      tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
      weather.temperature.unit = "celsius";
   }
})