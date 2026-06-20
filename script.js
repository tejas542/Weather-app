async function getWeatherData() {

    const cityName = document.querySelector("#cityInput").value.trim();

    if (cityName === "") {
        document.querySelector("#dataResult").innerHTML = `
            <div class="alert alert-warning">
                Please enter a city name
            </div>
        `;
        return;
    }

    try {

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=ca018df54353f065aaed7d802825b8be`
        );

        const data = await res.json();

        renderData(data);

        document.querySelector("#cityInput").value = "";

    } catch (error) {

        document.querySelector("#dataResult").innerHTML = `
            <div class="alert alert-danger">
                Something went wrong. Try again later.
            </div>
        `;
        

        console.error(error);
    }
}

function renderData(data) {
    console.log(data.weather[0].icon);

    if (data.cod != 200) {
        document.querySelector("#dataResult").innerHTML = `
            <div class="alert alert-danger">
                ${data.message}
            </div>
        `;
        return;
    }

    document.querySelector("#dataResult").innerHTML = `
    
        <div class="card shadow p-3 mt-3">

            <div class="text-center">
                <h2>${data.name}, ${data.sys.country}</h2>

                <img
                    src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
                    alt="Weather Icon">
                

                <h1>${Math.round(data.main.temp)}°C</h1>

                <h5 class="text-capitalize">
                    ${data.weather[0].description}
                </h5>
            </div>

            <hr>

            <div class="row text-center">

                <div class="col-6 mb-3">
                    <h6>Feels Like</h6>
                    <p>${Math.round(data.main.feels_like)}°C</p>
                </div>

                <div class="col-6 mb-3">
                    <h6>Humidity</h6>
                    <p>${data.main.humidity}%</p>
                </div>

                <div class="col-6">
                    <h6>Wind Speed</h6>
                    <p>${data.wind.speed} m/s</p>
                </div>

                <div class="col-6">
                    <h6>Pressure</h6>
                    <p>${data.main.pressure} hPa</p>
                </div>

            </div>

        </div>
    `;
}

document.querySelector("#cityInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeatherData();
    }
});