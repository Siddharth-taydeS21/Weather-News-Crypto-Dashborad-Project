// ============================= EXPORTS AND IMPORTS ==============================
export { getGeoLocation, getWeatherDetails, WeatherForecastObjects, getUserLocation }
import { isMainWeatherLoading, addWeatherDetails, addTodaysHighlights, addWeatherForeCastCards } from "./wetherUI.js";
import { forMatSunTime } from "./utils.js";
import { getNews, getCategoryNews} from "./newsAPI.js";
// ================================= WEATHER API AND DATA FETCHING LOGIC ================================
const WEATHER_API_KEY = 'aad3ff0d1617a1925037afb51c4feefc';

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
    const { lat, lon, cityName, WEATHER_API_KEY } = obj;

    // ================ HANDLING LOADING STATES ====================
    isMainWeatherLoading('load');
    
    // console.log(lat, lon, cityName, WEATHER_API_KEY);
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`)
        if (!response.ok) {
            throw new Error('Failed to fetch weather data!')
        }

        const data = await response.json();
        console.log(data);

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
        console.log(error);
        alert("Could not load data. Please try again later.");
        // SHOW WEATHER ERROR ON UI
        isMainWeatherLoading('error');

    } finally {
        // CLEAR LOADING STATES
        isMainWeatherLoading('clear');
    }
}

// FETCHING DATA ON THE BASIC OF USER INPUT
const getGeoLocation = () => {
    userInput.addEventListener('keydown', async (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();

        const city = userInput.value.trim();
        if (!city) return;

        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${WEATHER_API_KEY}`)
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


            getWeatherDetails({ lat, lon, cityName, WEATHER_API_KEY });
        } catch (error) {
            // alert("Could not load data. Please try again later.");
            console.log('There was en error: Not found!', error);
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

            getWeatherDetails({ lat, lon, WEATHER_API_KEY });
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

}
CurrentLocationBtn.addEventListener('click', getUserLocation);