// ========================= EXPORTS AND IMPORTS =========================
export { isMainWeatherLoading, addWeatherDetails, addTodaysHighlights, addWeatherForeCastCards, errorSvg }; // 
import { getWeatherImageSrc, getWindSpeed } from "./utils.js";
// =================== LOADING STATES HTML FUNCTIONS FOR UI (WEATHER SECTION) =======================
const MainWeatherCard = document.querySelector('.main_weather_card');
const MainWeatherCardTemplate = document.getElementById('weather_card_template');

const weatherHighlightsContainer = document.querySelector('.weather_highlights_cards');
const weatherHighlightsContainerTemplate = document.getElementById('weather_highlights_cards_template');

const ForeCatsContainer = document.querySelector('.weather_forecast');
const ForeCatsContainerTemplate = document.getElementById('weather_forecasts_card_template');
const forecastCardsContainer = ForeCatsContainer.querySelector('.weather_forecast_container');

const errorSvg = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24" class="justify-self-center">
  <g id="chat-error-fill">
    <path id="Union" fill="#000000" d="M20 2c1.1046 0 2 0.89543 2 2v12c0 1.1046 -0.8954 2 -2 2H5.91406l-2.20703 2.207c-0.286 0.286 -0.71617 0.3716 -1.08984 0.2168C2.24359 20.269 2 19.9044 2 19.5V4c0 -1.10457 0.89543 -2 2 -2zm-4.543 4.54297c-0.3905 -0.39052 -1.0235 -0.3905 -1.414 0L12 8.58594 9.95703 6.54297c-0.39052 -0.39052 -1.02353 -0.3905 -1.41406 0 -0.39053 0.39052 -0.39053 1.02354 0 1.41406L10.5859 10l-2.04293 2.043c-0.39053 0.3905 -0.39053 1.0235 0 1.414s1.02356 0.3905 1.41406 0L12 11.4141l2.043 2.0429c0.3905 0.3905 1.0235 0.3905 1.414 0s0.3905 -1.0235 0 -1.414L13.4141 10l2.0429 -2.04297c0.3905 -0.3905 0.3905 -1.02354 0 -1.41406" stroke-width="1"></path>
  </g>
</svg>
`;

// =========== LOADING STATE FOR WEATHER SECTION ===========
const isMainWeatherLoading = (str) => {
    if (str === 'load') {
        MainWeatherCard.innerHTML = '';
        const MainWeatherCardLoader = MainWeatherCardTemplate.content.cloneNode(true);;
        MainWeatherCard.append(MainWeatherCardLoader);

        weatherHighlightsContainer.innerHTML = '';
        const weatherHighlightsLoader = weatherHighlightsContainerTemplate.content.cloneNode(true);
        weatherHighlightsContainer.append(weatherHighlightsLoader);

        ForeCatsContainer.innerHTML = '';
        const ForeCatsContainerLoader = ForeCatsContainerTemplate.content.cloneNode(true);
        ForeCatsContainer.append(ForeCatsContainerLoader);
    } else if (str === 'error') {
        const WeatherLoadingImage = document.querySelector('.weather_image_container');
        const loadingBtnHighlights = document.getElementById('highlight_loader_btn');
        const loadingBtnForecast = document.getElementById('forecast_loader_btn');

        WeatherLoadingImage.innerHTML = `
        <p>
        ${errorSvg}
        Error: Wether details not Available
        </p>
        `;

        loadingBtnHighlights.style.fontSize = '20px'
        loadingBtnHighlights.innerHTML = `
        <p>
        ${errorSvg}
        Error: Wether details not Available
        </p>
        `;

        loadingBtnForecast.style.fontSize = '20px'
        loadingBtnForecast.innerHTML = `
        <p>
        ${errorSvg}
        Error: Wether details not Available
        </p>
        `;
    } else if (str === 'clear') {
        MainWeatherCard.querySelector('.weather_image_container').classList.remove('animate-pulse');
        MainWeatherCard.querySelector('.min_temp').classList.remove('animate-pulse');
        MainWeatherCard.querySelector('.max_temp').classList.remove('animate-pulse');

        const highlightCards = weatherHighlightsContainer.querySelectorAll('.highlight_card');
        highlightCards.forEach(card => {
            card.classList.remove('animate-pulse');
            card.querySelectorAll('p').forEach(p => p.classList.remove('animate-pulse'));
        })

        const forecastCards = ForeCatsContainer.querySelectorAll('.forecast_card');
        forecastCards.forEach(card => {
            card.classList.remove('animate-pulse');
            card.querySelectorAll('p').forEach(p => p.classList.remove('animate-pulse'))
            card.querySelectorAll('.weather_image_container').forEach(elem => elem.classList.remove('animate-pulse'));
            card.querySelectorAll('.weather_container').forEach(elem => elem.classList.remove('animate-pulse'));
        })

    }
}

// =========== DISPLAYING DATA ON MAIN WEATHER DETAILS CARD  ===========
const addWeatherDetails = (obj) => {
    const { displayCityName, countryCode, mainTemp, feelsLikeTemp, weatherDescription, weatherStatusCode, maxTemp, minTemp } = obj;
    const weatherImageSrc = getWeatherImageSrc(weatherStatusCode);
    const weatherDescriptionText = weatherDescription.replace(/ /g, "<br>");
    MainWeatherCard.innerHTML = '';
    MainWeatherCard.innerHTML = `
                            <div class="weather_image_container bg-black flex flex-col gap-y-3 justify-between overflow-hidden p-3 rounded-xl relative h-[250px] md:h-[80%]">
                                <img src="${weatherImageSrc}" alt="${weatherDescription}" class="absolute top-0 left-0 h-full w-full bg-center bg-cover bg-no-repeat object-cover mask-b-from-60% mask-b-to-100%">
                                <div
                                    class="location w-[92%] flex justify-between items-center p-2 bg-gray-200 rounded-4xl absolute top-3 left-0 right-0 mx-auto">
                                    <span id="city" class="ml-3">${displayCityName}</span>
                                    <span id="country" class="bg-blue-300 p-[.25rem_.5rem_.25rem_1rem] rounded-3xl">
                                        ${countryCode}
                                        <i class="ri-map-pin-fill"></i>
                                    </span>
                                </div>
                                <div class="temperature text-5xl font-bold md:text-6xl lg:text-7xl text-white text-shadow-xs/50 absolute left-4 bottom-3">${Math.round(mainTemp)}°</div>
                                <div class="weather_description text-white flex flex-col text-end text-sm text-shadow-xs absolute right-4 bottom-3">
                                    <h2 class="text-xl lg:text-2xl lg:font-bold capitalize">${weatherDescriptionText}</h2>
                                    <span id="feels_like_temp">Feels like : ${Math.round(feelsLikeTemp)}°</span>
                                </div>
                            </div>

                            <div class="detail_badges text-sm flex gap-3 items-end md:h-[20%]">
                                <span class="max_temp bg-red-200 px-2 py-1 rounded-2xl">MAX-TEMP: ${Math.round(maxTemp)}°</span>
                                <span class="min_temp bg-blue-200 px-2 py-1 rounded-2xl">MIN-TEMP: ${Math.round(minTemp)}°</span>
                            </div>           
    `;
}

// =========== DISPLAYING DATA IN TODAY'S HIGHLIGHTS CARD ===========
const addTodaysHighlights = (obj) => {
    const { sunRiseTime, sunSetTime, humidity, windSpeed } = obj;
    weatherHighlightsContainer.innerHTML =  `
                            <h1 class="highlights_main_text text-center text-3xl lg:text-4xl font-bold">Todays Highlights</h1>
                             <div class="highlights_cards_container grid gap-4 grid-cols-2 w-full">
                                 <article class="highlight_card">
                                     <div id="item_image" class="w-20 mx-auto">
                                         <img src="./assets/Images/sun-rise.png" alt="image">
                                     </div>
                                     <div>
                                         <h2>Sun-rise: </h2>
                                         <span id="sunrise">${sunRiseTime}</span>
                                     </div>
                                 </article>

                                 <article class="highlight_card">
                                     <div id="item_image" class="w-22 mx-auto">
                                         <img src="./assets/Images/sun-set.png" alt="image">
                                     </div>
                                     <div>
                                         <h2>Sun-set: </h2>
                                         <span id="sunset">${sunSetTime}</span>
                                     </div>
                                 </article>

                                 <article class="highlight_card">
                                     <div id="item_image" class="w-18 mx-auto">
                                         <img src="./assets/Images/humidity.png" alt="image">
                                     </div>
                                     <div>
                                         <h2>Humidity: </h2>
                                         <span id="humidity">${humidity}%</span>
                                     </div>
                                 </article>

                                 <article class="highlight_card">
                                     <div id="item_image" class="w-19 mt-2 mx-auto">
                                         <img src="./assets/Images/wind-speed.png" alt="image">
                                     </div>
                                     <div>
                                         <h2>Wind speed: </h2>
                                         <span id="windSpeed">${getWindSpeed(windSpeed)}</span>
                                     </div>
                                 </article>
                             </div>
    `
}

// =========== DISPLAYING DATA ON FORECAST CARDS  ===========
const addWeatherForeCastCards = (arr) => {
    const loadingBtn = ForeCatsContainer.querySelector('button');
    if (loadingBtn) {
        loadingBtn.outerHTML = `<h1 class="weather_forecast_title my-2 text-3xl md:text-4xl mb-2 md:mb-4 font-extrabold">Next 5 days weather forecast</h1>`;
    }

    const container = ForeCatsContainer.querySelector('.weather_forecast_container');
    container.innerHTML = '';

    arr.forEach((obj, index) => {
        // console.log(obj)
        const unixTimestamp = obj.dt;
        let dayName = '';
        const date = new Date(unixTimestamp * 1000);
        if (index === 0) {
            dayName = 'Today'
        } else {
            dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        }

        // const weatherIcon = obj.weather[0].icon
        const main_temp = Math.round(obj.main.temp);
        const description = obj.weather[0].description;
        const descriptionText = description.replace(/ /g, "<br>");
        const weatherStatusCode = obj.weather[0].id;

        if (index === 0) {
            container.innerHTML += `
                        <article class="forecast_card bg-amber-100">
                            <p class="card_date">${dayName}</p>
                            <div class="weather_image_container">
                            <img src="${getWeatherImageSrc(weatherStatusCode)}" alt="image" class="weather_img">
                            </div>
                            <div class="weather_container">
                                <p class="main_temp">${main_temp}°</p>
                                <p class="weather_description">${descriptionText}</p>
                            </div>
                        </article>          
           `;
        } else {
            container.innerHTML += `
                        <article class="forecast_card">
                            <p class="card_date">${dayName}</p>
                            <div class="weather_image_container">
                            <img src="${getWeatherImageSrc(weatherStatusCode)}" alt="image" class="weather_img">
                            </div>
                            <div class="weather_container">
                                <p class="main_temp">${main_temp}°</p>
                                <p class="weather_description">${descriptionText}</p>
                            </div>
                        </article>

           `;
        }
    })
}