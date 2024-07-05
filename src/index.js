const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const currentLocation = document.querySelector("#current-location");
const currentTemp = document.querySelector("#current-temp");
const currentCity = document.querySelector("#current-city");
const currentDate = document.querySelector("#current-date")
const currentCondition = document.querySelector("#current-condition")
const currentWind = document.querySelector("#current-wind")
const currentHumidity = document.querySelector("#current-humidity");
const currentImg = document.querySelector("#current-img");

// forecast elements
const forecastOneDay = document.querySelector("#forecast-one-day");
const forecastOneImg = document.querySelector("#forecast-one-img")
const forecastOneTemp = document.querySelector("#forecast-one-temp");
const forecastOneWind = document.querySelector("#forecast-one-wind");
const forecastOneHumidity = document.querySelector("#forecast-one-humidity");


const forecastTwoDay = document.querySelector("#forecast-two-day");
const forecastTwoImg = document.querySelector("#forecast-two-img")
const forecastTwoTemp = document.querySelector("#forecast-two-temp");
const forecastTwoWind = document.querySelector("#forecast-two-wind");
const forecastTwoHumidity = document.querySelector("#forecast-two-humidity");

const forecastThreeDay = document.querySelector("#forecast-three-day");
const forecastThreeImg = document.querySelector("#forecast-three-img")
const forecastThreeTemp = document.querySelector("#forecast-three-temp");
const forecastThreeWind = document.querySelector("#forecast-three-wind");
const forecastThreeHumidity = document.querySelector("#forecast-three-humidity");

const forecastFourDay = document.querySelector("#forecast-four-day");
const forecastFourImg = document.querySelector("#forecast-four-img")
const forecastFourTemp = document.querySelector("#forecast-four-temp");
const forecastFourWind = document.querySelector("#forecast-four-wind");
const forecastFourHumidity = document.querySelector("#forecast-four-humidity");

const forecastFiveDay = document.querySelector("#forecast-five-day");
const forecastFiveImg = document.querySelector("#forecast-five-img")
const forecastFiveTemp = document.querySelector("#forecast-five-temp");
const forecastFiveWind = document.querySelector("#forecast-five-wind");
const forecastFiveHumidity = document.querySelector("#forecast-five-humidity");




searchBtn.addEventListener("click", async function(e) {
    e.preventDefault();

    let city = cityInput.value.trim() ;
    console.log(city);
    let data = await getWeather(city);

    // console.log("current temp:", data.current.temp_c)
    currentTemp.innerText = `${Math.trunc(data.current.temp_c)}°C`;
    currentCity.innerText = `${data.location.name}, ${data.location.country}`;
    
    let dayAndDate = formatDate(new Date());
    // console.log("dayAndDate", dayAndDate);
    currentDate.innerText = dayAndDate;

    currentCondition.innerText = data.current.condition.text;
    currentWind.innerText = `${data.current.wind_mph} mph`;
    currentHumidity.innerText = `${data.current.humidity}%`;
    currentImg.src = data.current.condition.icon;

    fillForeCast(data);

})



function fillForeCast(data) {
    console.log("filling forecast");
    
    
    // console.log("Logging date", data.forecast.forecastday[0].date);

    // filling forecast One data
    let date = new Date(data.forecast.forecastday[0].date);
    let formatedDate = formatDate(date);
    let day = formatedDate.slice(0, 3);   
    forecastOneDay.innerText = day;
    forecastOneImg.src = data.forecast.forecastday[0].day.condition.icon;
    let maxTemp = data.forecast.forecastday[0].day.maxtemp_c;
    let minTemp = data.forecast.forecastday[0].day.mintemp_c;
    forecastOneTemp.innerText = `Temp: ${Math.trunc(maxTemp)}°/${Math.trunc(minTemp)}°`;
    forecastOneWind.innerText = `Wind: ${data.forecast.forecastday[0].day.maxwind_mph} mph`;
    forecastOneHumidity.innerText = `Humidity: ${data.forecast.forecastday[0].day.avghumidity}%`;
   
    // filling forecast two data
    date = new Date(data.forecast.forecastday[1].date);
    formatedDate = formatDate(date);
    day = formatedDate.slice(0, 3);   
    forecastTwoDay.innerText = day;
    forecastTwoImg.src = data.forecast.forecastday[1].day.condition.icon;
    maxTemp = data.forecast.forecastday[1].day.maxtemp_c;
    minTemp = data.forecast.forecastday[1].day.mintemp_c;
    forecastTwoTemp.innerText = `Temp: ${Math.trunc(maxTemp)}°/${Math.trunc(minTemp)}°`;
    forecastTwoWind.innerText = `Wind: ${data.forecast.forecastday[1].day.maxwind_mph} mph`;
    forecastTwoHumidity.innerText = `Humidity: ${data.forecast.forecastday[1].day.avghumidity}%`;

    // filling forecast three data
    date = new Date(data.forecast.forecastday[2].date);
    formatedDate = formatDate(date);
    day = formatedDate.slice(0, 3);   
    forecastThreeDay.innerText = day;
    forecastThreeImg.src = data.forecast.forecastday[2].day.condition.icon;
    maxTemp = data.forecast.forecastday[2].day.maxtemp_c;
    minTemp = data.forecast.forecastday[2].day.mintemp_c;
    forecastThreeTemp.innerText = `Temp: ${Math.trunc(maxTemp)}°/${Math.trunc(minTemp)}°`;
    forecastThreeWind.innerText = `Wind: ${data.forecast.forecastday[2].day.maxwind_mph} mph`;
    forecastThreeHumidity.innerText = `Humidity: ${data.forecast.forecastday[2].day.avghumidity}%`;

    // filling forecast four data
    date = new Date(data.forecast.forecastday[3].date);
    formatedDate = formatDate(date);
    day = formatedDate.slice(0, 3);   
    forecastFourDay.innerText = day;
    forecastFourImg.src = data.forecast.forecastday[3].day.condition.icon;
    maxTemp = data.forecast.forecastday[3].day.maxtemp_c;
    minTemp = data.forecast.forecastday[3].day.mintemp_c;
    forecastFourTemp.innerText = `Temp: ${Math.trunc(maxTemp)}°/${Math.trunc(minTemp)}°`;
    forecastFourWind.innerText = `Wind: ${data.forecast.forecastday[3].day.maxwind_mph} mph`;
    forecastFourHumidity.innerText = `Humidity: ${data.forecast.forecastday[3].day.avghumidity}%`;

    // filling forecast five data
    date = new Date(data.forecast.forecastday[4].date);
    formatedDate = formatDate(date);
    day = formatedDate.slice(0, 3);   
    forecastFiveDay.innerText = day;
    forecastFiveImg.src = data.forecast.forecastday[4].day.condition.icon;
    maxTemp = data.forecast.forecastday[4].day.maxtemp_c;
    minTemp = data.forecast.forecastday[4].day.mintemp_c;
    forecastFiveTemp.innerText = `Temp: ${Math.trunc(maxTemp)}°/${Math.trunc(minTemp)}°`;
    forecastFiveWind.innerText = `Wind: ${data.forecast.forecastday[4].day.maxwind_mph} mph`;
    forecastFiveHumidity.innerText = `Humidity: ${data.forecast.forecastday[4].day.avghumidity}%`;




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
