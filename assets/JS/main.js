// ================================= MAIN PAGE LOGIC ==================================
const WEATHER_API_KEY = 'aad3ff0d1617a1925037afb51c4feefc';
const NEWS_API_KEY = 'pub_0ca0c6f095ce4be7bc83b7da6ac077ed';

//  ====== SHOW MOBILE NAV MENU ON MENU CLICK ======= 
const toggle = document.getElementById('toggle_button');
const nav_menu = document.querySelector('.nav_menu');

const toggleLeft = () => {
    nav_menu.classList.toggle('max-lg:left-[120%]');
    nav_menu.classList.toggle('max-lg:left-0');
};

toggle.addEventListener('click', toggleLeft)

// ====== HIDE MOBILE NAV MENU ======= 
const closeBtn = document.getElementById('close_button');
const nav_links = document.querySelectorAll('.nav_link');

nav_links.forEach(link => {
    link.addEventListener('click', toggleLeft)
})
closeBtn.addEventListener('click', toggleLeft)

// ===============================  RENDERING DATA ON MAIN PAGE =============================
const turnCateText = (str, limit) => {
    const maxLength = limit;
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    }
    return str + '.';
}

// =============================== ADDING BREAKING NEWS DATA TO THE MAIN PAGE =====================================
const addBreakingNews = (obj) => {
    const breakingNewsLink = obj.results[0].link;
    const breakingNewsTitle = obj.results[0].title;
    const breakingNewsImage = obj.results[0].image_url;
    // const breakingNewsDescription = obj.results[0].description;

    document.querySelector('.breaking_news_image').innerHTML = `<img src="${breakingNewsImage}" alt="news Image" class="object-cover object-center bg-no-repeat">`;

    const breakingNewsTitleElem = document.querySelector('.breaking_news_title');
    breakingNewsTitleElem.innerHTML = `${breakingNewsTitle}`;
    breakingNewsTitleElem.href = breakingNewsLink;
}

const addTopHeadlines = (obj) => {
    const headlinesContainer = document.querySelector('.top_headlines_container')
    headlinesContainer.innerHTML = '';
    obj.results.forEach(news => {
        headlinesContainer.innerHTML += `
                            <article class="news_slide">
                                <div class="headline_image">
                                    <img src="${news.image_url}" alt="news image" class="object-cover object-center bg-no-repeat">
                                </div>
                                <div class="headline_title">
                                    <a href='${news.link}' id="headline_title_text" class="overflow-clip font-bold">${turnCateText(news.title, 80)}</a>
                                </div>
                            </article>
        `;
    })
    headlinesContainer.innerHTML += `
                        <div class="rounded-2xl my-8 flex justify-center items-center">
                            <button class="bg-blue-400 h-10 w-40 rounded-2xl flex justify-center items-center">Show More..>></button>
                        </div>
    `
}

// =============================== NEWS API DATA FETCH LOGIC =====================================

const sportsNewsContainer = document.querySelector('.sports_news_container');
const techNewsContainer = document.querySelector('.tech_news_container');
const businessNewsContainer = document.querySelector('.business_news_container');

const getNews = async (str) => {
    try {
        const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${NEWS_API_KEY}&qInTitle=${str}`);
        if (!response.ok) {
            throw new Error('Failed to fetch news data!');
        }

        const data = await response.json();
        console.log(data);
        addBreakingNews(data);
        addTopHeadlines(data);

    } catch (error) {
        alert("Could not load data. Please try again later.");
        console.log('There was en error: Not found!', error)
    }
}

const getCategoryNews = async (str, category, HtmlContainer) => {
 try {
    const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${NEWS_API_KEY}&q=${str}&category=${category}&size=7`);
    if(!response.ok){
        throw new Error('Failed to fetch news data!');
    }

    const data = await response.json();
    console.log(data);

    // ============= USING FETCHED DATA TO RENDER ON HTML ==============

    HtmlContainer.innerHTML = '';

    data.results.forEach(news => {
        HtmlContainer.innerHTML += `
                        <article class="news_card">
                            <div class="news_image">
                                <img src="${news.image_url}" alt="image" class="object-cover object-center bg-no-repeat">
                            </div>
                            <a href='${news.link}' class="news_title">
                                ${turnCateText(news.title, 80)}
                            </a>
                        </article>
        `;
    })

    HtmlContainer.innerHTML += `
                        <div class="rounded-2xl flex justify-center items-center">
                            <button class="bg-blue-400 h-10 w-40 rounded-2xl flex justify-center items-center">Show More..>></button>
                        </div>
    `

    
 } catch (error) {
    alert("Could not load data. Please try again later.");
    console.log('There was en error: Not found!', error)
 }
}

// ==================== OBJECT OF WEATHER CONDITIONS AND WEATHER IMAGES ======================= 
const weatherImages = [
    { name: 'clearSky', src: '/assets/Images/clear_sky.avif' },
    { name: 'fewClouds', src: '/assets/Images/few_clouds.avif' },
    { name: 'scatteredClouds', src: '/assets/Images/scattered_clouds.jpg' },
    { name: 'brokenClouds', src: '/assets/Images/broken_clouds.avif' },
    { name: 'showerRain', src: '/assets/Images/shower_rain.webp' },
    { name: 'rain', src: '/assets/Images/rain.jpg' },
    { name: 'thunderstorm', src: '/assets/Images/thunderStorm.jpg' },
    { name: 'snow', src: '/assets/Images/snow.avif' },
    { name: 'mist', src: '/assets/Images/mist.avif' }
]

// =========== SETTING WEATHER IMAGES ACCORDING TO WEATHER STATUS CODES  =============

const defaultWeatherImage = '/assets/Images/sky_default_image.avif'

const getWeatherImageSrc = (statusCode) => {
    let conditionName = null

    if (statusCode >= 200 && statusCode <= 232) {
        conditionName = 'thunderstorm'
    } else if (statusCode === 511 || (statusCode >= 600 && statusCode <= 622)) {
        conditionName = 'snow'
    } else if (
        (statusCode >= 300 && statusCode <= 321) ||
        (statusCode >= 520 && statusCode <= 531 && statusCode !== 511)
    ) {
        conditionName = 'showerRain'
    } else if (statusCode >= 500 && statusCode <= 504) {
        conditionName = 'rain'
    } else if (statusCode >= 701 && statusCode <= 781) {
        conditionName = 'mist'
    } else if (statusCode === 800) {
        conditionName = 'clearSky'
    } else if (statusCode === 801) {
        conditionName = 'fewClouds'
    } else if (statusCode === 802) {
        conditionName = 'scatteredClouds'
    } else if (statusCode === 803 || statusCode === 804) {
        conditionName = 'brokenClouds'
    }

    const match = weatherImages.find((img) => img.name === conditionName)
    return match ? match.src : defaultWeatherImage
}

// =========== DISPLAYING DATA ON MAIN WEATHER DETAILS CARD  ===========

const addWeatherDetails = (obj) => {
    const { displayCityName, countryCode, mainTemp, feelsLikeTemp, weatherDescription, weatherStatusCode, maxTemp, minTemp } = obj;
    const weatherImageSrc = getWeatherImageSrc(weatherStatusCode);
    const weatherDescriptionText = weatherDescription.replace(/ /g, "<br>");
    const MainWeatherCard = document.querySelector('.main_weather_card');
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

                                <!-- <img src="" alt="image" id="weather_img" class="w-[180px]"> -->
                                <!-- for response link reference -->
                                <!-- scr='https://openweathermap.org{icon_code}@2x.png' -->
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
    `
}
// =========== CONVERTING SPEED FROM METER PER SECOND TO MILES PER HUR AND KM/HOUR ===========
const getWindSpeed = (speed) => {
    const milesPerHours = speed * 2.237;
    const km_perHours = speed * 3.6;
    return `${Math.round(milesPerHours)} mph <br> (${Math.round(km_perHours)} km/h)`
}

// =========== DISPLAYING DATA IN TODAY'S HIGHLIGHTS CARD ===========

const addTodaysHighlights = (obj) => {
    const { sunRiseTime, sunSetTime, humidity, windSpeed } = obj;
    document.querySelector('#sunrise').textContent = `${sunRiseTime}`
    document.querySelector('#sunset').textContent = `${sunSetTime}`
    document.querySelector('#humidity').textContent = `${humidity}%`
    document.querySelector('#windSpeed').innerHTML = `${getWindSpeed(windSpeed)}`
}

// =========== DISPLAYING DATA ON FORECAST CARDS  ===========

const addWeatherForeCastCards = (arr) => {
    const forecastContainer = document.querySelector('.weather_forecast_container');
    forecastContainer.innerHTML = '';
    arr.forEach((obj, index) => {
        // console.log(obj)
        const unixTimestamp = obj.dt;
        const date = new Date(unixTimestamp * 1000);
        if (index === 0) {
            dayName = 'Today'
        } else {
            dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        }

        const weatherIcon = obj.weather[0].icon
        const main_temp = Math.round(obj.main.temp);
        const description = obj.weather[0].description;
        const descriptionText = description.replace(/ /g, "<br>");

        if (index === 0) {
            forecastContainer.innerHTML += `
                        <article class="forecast_card bg-amber-100">
                            <p class="card_date font-semibold">${dayName}</p>
                            <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="icon" class="card_icon scale-150">
                            <div class="card_temperature text-3xl font-bold">${main_temp}°</div>
                            <p class="card_description font-bold text-xs text-end absolute right-3 bottom-4">${descriptionText}</p>
                        </article>
       `
        } else {
            forecastContainer.innerHTML += `
                        <article class="forecast_card">
                            <p class="card_date font-semibold">${dayName}</p>
                            <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="icon" class="card_icon scale-150">
                            <div class="card_temperature text-3xl font-bold">${main_temp}°</div>
                            <p class="card_description font-bold text-xs text-end absolute right-3 bottom-4">${descriptionText}</p>
                        </article>
       `
        }
    })
}

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

// ================================= API AND DATA FETCHING LOGIC ================================

// ==== Getting city details for fetching weather data =====
const userInput = document.getElementById('search_input');

const getWeatherDetails = async (obj) => {
    const { lat, lon, cityName, WEATHER_API_KEY } = obj;

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

        const forMatSunTime = (unixSeconds, offsetSec) => {
            const date = new Date((unixSeconds + offsetSec) * 1000);
            const hours = date.getUTCHours();
            const minutes = date.getUTCMinutes().toString().padStart(2, 0);
            const period = hours >= 12 ? 'PM' : 'AM';
            const hours12 = hours % 12 || 12;

            return `${hours12}:${minutes} ${period}`;
            // console.log(date)
            // console.log(hours)
            // console.log(minutes)
        }

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
    }
}

// FETCHING DATA ON THE BASIC OF USER INPUT

const getGeoLocation = () => {
    userInput.addEventListener('change', async (e) => {
        const city = e.target.value.trim();

        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${WEATHER_API_KEY}`)
            if (!response.ok) {
                throw new Error('Failed to fetch weather data!')
            }

            const data = await response.json();
            const lat = data[0].lat;
            const lon = data[0].lon;
            const cityName = data[0].name;

            getWeatherDetails({ lat, lon, cityName, WEATHER_API_KEY });
        } catch (error) {
            alert("Could not load data. Please try again later.");
            console.log('There was en error: Not found!', error)
        }

    });
}
getGeoLocation();

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
CurrentLocationBtn.addEventListener('click', getUserLocation)