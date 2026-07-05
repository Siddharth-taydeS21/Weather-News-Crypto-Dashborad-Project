// ============================= EXPORTS AND IMPORTS ==============================
export { getGeoLocation, getWeatherDetails, WeatherForecastObjects, getUserLocation }
import { isMainWeatherLoading, addWeatherDetails, addTodaysHighlights, addWeatherForeCastCards } from "./wetherUI.js";
import { forMatSunTime } from "./utils.js";
import { getNews, getCategoryNews} from "./newsAPI.js";
// ================================= WEATHER API AND DATA FETCHING LOGIC ================================

const wKey = import.meta.env.VITE_WETHER_API_KEY;


// ==== Getting city details for fetching weather data =====
const userInput = document.getElementById('search_input');

const sportsNewsContainer = document.querySelector('.sports_news_container');
const techNewsContainer = document.querySelector('.tech_news_container');
const businessNewsContainer = document.querySelector('.business_news_container');

const WeatherForecastObjects = (obj) => {
    const seenDates = new Set();
    const uniqueForecastByDate = [];

    obj.list.forEach((item) => {
        const dateKey = item.dt_txt.split(' ')[0];
        if (!seenDates.has(dateKey)) {
            seenDates.add(dateKey);
            uniqueForecastByDate.push(item);
        }
    }); 
    addWeatherForeCastCards(uniqueForecastByDate);
}

const getWeatherDetails = async (obj) => {
    const { lat, lon, cityName, wKey } = obj;
    const coordinates = [lat, lon, cityName];
    localStorage.setItem('Weather_coordinates', JSON.stringify(coordinates));

    // ================ HANDLING LOADING STATES ====================
    isMainWeatherLoading('load');
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${wKey}`)
        if (!response.ok) {
            throw new Error('Failed to fetch weather data!')
        }

        const data = await response.json();

        //GETTING DATA FOR MAIN WEATHER CARD (.main_weather_card) :-
        const displayCityName = data.city.name;
        const countryCode = data.city.country;
        const mainTemp = data.list[0].main.temp;
        const feelsLikeTemp = data.list[0].main.feels_like;
        const weatherDescription = data.list[0].weather[0].description;
        const weatherStatusCode = data.list[0].weather[0].id;
        const minTemp = data.list[0].main.temp_min;
        const maxTemp = data.list[0].main.temp_max;

        // GIVING MAIN CARD DATA TO THE RENDER FUNCTION
        addWeatherDetails({ displayCityName, countryCode, mainTemp, feelsLikeTemp, weatherDescription, weatherStatusCode, maxTemp, minTemp });

        //WE NEED TIMEZONE FOR GETTING ACCURATE SUNRISE AND SUNSET TIME
        const timezoneOffset = data.city.timezone;

        const sunrise = data.city.sunrise;
        const sunset = data.city.sunset;
        const humidity = data.list[0].main.humidity;
        const windSpeed = data.list[0].wind.speed;

        const sunRiseTime = forMatSunTime(sunrise, timezoneOffset);
        const sunSetTime = forMatSunTime(sunset, timezoneOffset);

        //GETTING DATA FOR TODAY'S HIGHLIGHTS CARDS (.weather_highlights_cards) :-
        addTodaysHighlights({ sunRiseTime, sunSetTime, humidity, windSpeed });

        //GETTING DATA FOR NEXT 4 DAYS FORECAST (.weather_highlights_cards) :-
        WeatherForecastObjects(data);

        if (userInput) userInput.value = '';

        // GIVING THE CITY NAME TO GET_NEWS_FUNCTION
        getNews(cityName);

        // GIVING THE CITY NAME TO GET CATEGORY VISE NEWS;
        getCategoryNews(cityName, "sports", sportsNewsContainer);
        getCategoryNews(cityName, "technology", techNewsContainer);
        getCategoryNews(cityName, "business", businessNewsContainer);

    }
    catch (error) {
        alert("Could not load data. Please try again later.");
        // SHOW WEATHER ERROR ON UI
        isMainWeatherLoading('error');

    }
}

// FETCHING DATA ON THE BASIC OF USER INPUT
const getGeoLocation = () => {
    // debugger
    userInput.addEventListener('keydown', async (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();

        const city = userInput.value.trim();
        if (!city) return;

        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${wKey}`)
            if (!response.ok) {
                throw new Error('Failed to fetch weather data!')
            }

            const data = await response.json();
            if (!data.length) {
                alert("City not found. Please try another name.");
                return;
            }

            const lat = data[0].lat;
            const lon = data[0].lon;
            const cityName = data[0].name;


            getWeatherDetails({ lat, lon, cityName, wKey });
        } catch (error) {
            // alert("Could not load data. Please try again later.");
            isMainWeatherLoading('error');
        } finally{
            isMainWeatherLoading("false");
        }

    });
}

// ======================== USE YOUR CURRENT LOCATION LOGIC ===========================
const CurrentLocationBtn = document.getElementById('current_locationBtn')
const getUserLocation = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            getWeatherDetails({ lat, lon, wKey });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }

}
CurrentLocationBtn.addEventListener('click', getUserLocation);