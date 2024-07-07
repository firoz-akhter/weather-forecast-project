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
const form = document.querySelector("#form");

// fetching forecast 1 elements
const forecastOneDay = document.querySelector("#forecast-one-day");
const forecastOneImg = document.querySelector("#forecast-one-img")
const forecastOneTemp = document.querySelector("#forecast-one-temp");
const forecastOneWind = document.querySelector("#forecast-one-wind");
const forecastOneHumidity = document.querySelector("#forecast-one-humidity");

// fetching forecast 2 elements
const forecastTwoDay = document.querySelector("#forecast-two-day");
const forecastTwoImg = document.querySelector("#forecast-two-img")
const forecastTwoTemp = document.querySelector("#forecast-two-temp");
const forecastTwoWind = document.querySelector("#forecast-two-wind");
const forecastTwoHumidity = document.querySelector("#forecast-two-humidity");

// fetching forecast 3 elements
const forecastThreeDay = document.querySelector("#forecast-three-day");
const forecastThreeImg = document.querySelector("#forecast-three-img")
const forecastThreeTemp = document.querySelector("#forecast-three-temp");
const forecastThreeWind = document.querySelector("#forecast-three-wind");
const forecastThreeHumidity = document.querySelector("#forecast-three-humidity");

// fetching forecast 4 elements
const forecastFourDay = document.querySelector("#forecast-four-day");
const forecastFourImg = document.querySelector("#forecast-four-img")
const forecastFourTemp = document.querySelector("#forecast-four-temp");
const forecastFourWind = document.querySelector("#forecast-four-wind");
const forecastFourHumidity = document.querySelector("#forecast-four-humidity");

// fetching forecast 5 elements 
const forecastFiveDay = document.querySelector("#forecast-five-day");
const forecastFiveImg = document.querySelector("#forecast-five-img")
const forecastFiveTemp = document.querySelector("#forecast-five-temp");
const forecastFiveWind = document.querySelector("#forecast-five-wind");
const forecastFiveHumidity = document.querySelector("#forecast-five-humidity");



// event listener on City search button
searchBtn.addEventListener("click", async function(e) {
    e.preventDefault();
    let city = cityInput.value.trim() ;

    if(city === "") {
        alert("City name Can't be empty...");
        return ;
    }
    // console.log(city);
    try {
        let data = await getWeather(city);
        fillingUI(data);
        console.log("Saving city name...")
        saveLocalCity(city);
        updateCityHistoryUI();
        cityInput.value = "";
    }
    catch(error) {
        console.log("Something went wrong while getting weather", error.message);
        console.log("Please enter city name correctly...");
        return ;
    }

})


// Event listener on currentLocation button and functionality
currentLocation.addEventListener("click", async function() {

    try {
        let city = await getLatAndLong();
        let data = await getWeather(city);
        fillingUI(data);
        // save city name to localStorage
        saveLocalCity(data.location.name);
        updateCityHistoryUI();
    }
    catch(error) {
        alert(error.message);
        console.log(error);
    }
})


// even listener on form's click to track the click on History dropdown
form.addEventListener("click", async function(e) {
    let selection = e.target;
    if(selection.id === "cities") {
        if(selection.selectedIndex == 0) {
            // console.log("first element is selected...")
            return;
        }
        let selectedElement = selection.options[selection.selectedIndex];

        console.log(selectedElement.innerText)
        let city = selectedElement.innerText;
        let data = await getWeather(city);
        fillingUI(data);
        selection.selectedIndex = 0;
    }
})







// filling weather data from API result to UI element
function fillingUI(data) {
    console.log("filling forecast");

    // 1. update current UI section
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
    
    // console.log("Logging date", data.forecast.forecastday[0].date);

    // 2. filling forecast One data
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
   
    // 3. filling forecast two data
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

    // 4. filling forecast three data
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

    // 5. filling forecast four data
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

    // 6. filling forecast five data
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


// Fetching city data
async function getWeather(city="Varanasi") {

    // city = "28.67, 77.22";
    // city = "delhi, India"
    // city could be city = "cityName" or city = "lat, long"
    // const url = `https://api.weatherapi.com/v1/current.json?key=d43f677f21a44f919d653051240507&q=${city}&aqi=no`;

    // this url fetch current weather data with 5 days forecast
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=d43f677f21a44f919d653051240507&q=${city}&days=5`

    try {
        const response = await fetch(forecastUrl);
        const result = await response.json();
        // console.log(result)
        return result;
    } catch (error) {
        console.log("Something went wrong while fetching city data", error.message);
        // return error;
    }
}
// running getWeather to see fetched weather data in the console (wasn't necessary to call here);
getWeather();


// format data --> ex: Thur, July 4, 2024
function formatDate(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayDate = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}, ${month} ${dayDate}, ${year}`;
}

// On every serach saves data to local storage as string in an array called cities
function saveLocalCity(city) {
    let cities;
    if (localStorage.getItem("cities") === null) {
        cities = [];
    } else {
        cities = JSON.parse(localStorage.getItem("cities"));
    }
    // students[id] = {name, id, email, contact};
    if(cities.includes(city.toLowerCase()) == false) {
        cities.push(city.toLowerCase());
    }
    localStorage.setItem("cities", JSON.stringify(cities));
}

// returns the lattitude and longitude of the current location
function getLatAndLong() {
    return new Promise((resolve, reject) => {
        // Check if Geolocation is supported
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                resolve(`${latitude}, ${longitude}`);
            },
            (error) => {
                reject(error);
            }
        );
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}


// show search city from local storage to User Interface
function updateCityHistoryUI() {
    let cities = JSON.parse(localStorage.getItem("cities"));
    if(cities === null) {
        console.log("city history is empty...")
        return ;
    }
    if(cities.length === 0) {
        console.log("cities length is zero...")
        return ;
    }
    console.log(cities)

    let select = document.createElement("select")
    select.id = "cities";
    select.classList.add("w-20", "px-1", "py-2.5", "me-2", "mb-2", "text-sm", "font-medium", "text-gray-900", "focus:outline-none", "bg-white", "rounded-lg", "border", "border-gray-200", "hover:bg-gray-100", "hover:text-blue-700", "focus:z-10", "focus:ring-4", "focus:ring-gray-100", "dark:focus:ring-gray-700", "dark:bg-gray-800", "dark:text-gray-400", "dark:border-gray-600", "dark:hover:text-white", "dark:hover:bg-gray-700")

    // the first item in the dropdown menu would be history (to select none);
    let option = document.createElement("option");
    option.innerText = "History";
    select.appendChild(option);

    // get array from localStorage
    // run and for loop and fill option inside select
    for(let i=0; i<cities.length; i++) {
        let option = document.createElement("option");
        option.innerText = cities[i];
        select.appendChild(option);
    }

    let dropDown = document.querySelector(".dropdown");
    // dropDown.innerText = select;
    dropDown.innerHTML = "";
    dropDown.appendChild(select);

}

// run to check if search history is already in the localStorage and show the dropdown on display
updateCityHistoryUI();