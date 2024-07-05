console.log("invoking javascript...")


async function getWeather(city="Varanasi") {

    const url = `https://api.weatherapi.com/v1/current.json?key=d43f677f21a44f919d653051240507&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        console.error("something went wrong while fetching weather", error);
        return ;
    }
}
getWeather();


// "lat":26.80475,"long":80.894699
// lat=26.85&long=80.92
// apiKey = d43f677f21a44f919d653051240507
