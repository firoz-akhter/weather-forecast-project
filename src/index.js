const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const currentLocation = document.querySelector("#current-location");
const currentTemp = document.querySelector("#current-temp");
const currentCity = document.querySelector("#current-city");
const currentDate = document.querySelector("#current-date")
const currentCondition = document.querySelector("#current-condition")
const currentWind = document.querySelector("#current-wind")
const currentHumidity = document.querySelector("#current-humidity");

// forecast elements
const forecastOneDay = document.querySelector("#forecast-one-day");
const forecastOneTemp = document.querySelector("forecast-one-temp");


// console.log(cityInput, searchBtn, currentLocation, currentTemp, currentCity, currentDate)
// console.log(currentCondition, currentWind, currentHumidity)

searchBtn.addEventListener("click", async function(e) {
    e.preventDefault();

    let city = cityInput.value.trim() ;
    console.log(city);
    let data = await getWeather(city);

    // console.log("current temp:", data.current.temp_c)
    currentTemp.innerText = `${data.current.temp_c}°C`;
    currentCity.innerText = `${data.location.name}, ${data.location.country}`;
    
    let dayAndDate = formatDate(new Date());
    // console.log("dayAndDate", dayAndDate);
    currentDate.innerText = dayAndDate;

    currentCondition.innerText = data.current.condition.text;
    currentWind.innerText = `${data.current.wind_mph} mph`;
    currentHumidity.innerText = `${data.current.humidity}%`;

    // fillForeCast(data);

})



function fillForeCast(data) {



}


































































async function getWeather(city="Varanasi") {

    // city = "28.67, 77.22";
    // city = "delhi, India"
    // city could be city = "cityName" or city = "lat, long"
    const url = `https://api.weatherapi.com/v1/current.json?key=d43f677f21a44f919d653051240507&q=${city}&aqi=no`;
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=d43f677f21a44f919d653051240507&q=${city}&days=5`

    try {
        const response = await fetch(forecastUrl);
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        console.error("something went wrong while fetching weather", error);
        return ;
    }
}
getWeather();



function formatDate(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayDate = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}, ${month} ${dayDate}, ${year}`;
}
