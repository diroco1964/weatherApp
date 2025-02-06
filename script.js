let titleLogo = document.querySelector(".title");
let bodyElem = document.querySelector("body");

window.addEventListener("load", () => {
	let randNum = Math.ceil(Math.random() * 5);
	bodyElem.style.backgroundImage = `url('images/bgn${randNum}.png')`;
	if (randNum == 3 || randNum == 4 || randNum == 5) {
		titleLogo.style.color = "white";
	}
});

let cityInput = document.querySelector("#get-city");
cityInput.addEventListener("keypress", (event) => {
	if (event.key == "Enter") {
		fetchDataFromApi();
	}
});

let apiData = {
	url: "https://api.openweathermap.org/data/2.5/weather?q=",
	key: "124b92a8dd9ec01ffb0dbf64bc44af3c",
};
cityInput.value = "Buenos Aires";
fetchDataFromApi();
cityInput.value = "";
function fetchDataFromApi() {
	let insertedCity = cityInput.value;
	fetch(`${apiData.url}${insertedCity}&&appid=${apiData.key}&lang=es`)
		.then((res) => res.json())
		.then((data) => {
            if (data.cod === "404") {
                // Si la API devuelve un código 404, la ciudad no se encuentra
                cityName.innerHTML = "Ciudad no encontrada";
                cityTemp.innerHTML = "";
                cityCond.innerHTML = "";
                cityHumidity.innerHTML = "";
                todayDate.innerHTML = "";
            } else {
                // Si los datos son válidos, se muestran en la página
                addDataToDom(data);
            }
        })
        .catch((error) => {
            // En caso de error en la solicitud
            cityName.innerHTML = "Error al obtener los datos";
            cityTemp.innerHTML = "";
            cityCond.innerHTML = "";
            cityHumidity.innerHTML = "";
            todayDate.innerHTML = "";
        });
}

let cityName = document.querySelector(".city-name");
let cityTemp = document.querySelector(".weather-deg");
let cityCond = document.querySelector(".weather-condition");
let cityHumidity = document.querySelector(".humidity");
let todayDate = document.querySelector(".date");
function addDataToDom(data) {
	cityName.innerHTML = `${data.name}, ${data.sys.country}`;
	cityTemp.innerHTML = `${Math.round(data.main.temp - 273.15)}°c`;
	cityCond.innerHTML = data.weather[0].description;
	cityHumidity.innerHTML = `humedad: ${data.main.humidity}%`;
	todayDate.innerHTML = getDate();
}

let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
function getDate() {
	let newTime = new Date();
	let month = months[newTime.getMonth()];
	return `${newTime.getDate()} ${month} ${newTime.getFullYear()}`;
}