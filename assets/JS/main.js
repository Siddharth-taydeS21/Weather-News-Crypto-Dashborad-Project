// ===================== IMPORTS & EXPORTS ==================
import { getGeoLocation, getWeatherDetails } from './wetherAPI.js'
import { fetchData } from './cryptoAPI.js';
import { clearBtnTextChange } from "./utils.js";

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
closeBtn.addEventListener('click', toggleLeft);


const getLocalStorageCoordinates = () => {
    const coordinates = JSON.parse(localStorage.getItem('Weather_coordinates'));
    if (!coordinates) {
        return;
    }else{
        //lat, lon, cityName, WEATHER_API_KEY
        const lat = coordinates[0];
        const lon = coordinates[1];
        const cityName = coordinates[2];
        const WEATHER_API_KEY = coordinates[3];

        getWeatherDetails({lat, lon, cityName, WEATHER_API_KEY});
    }
}

getLocalStorageCoordinates();
getGeoLocation();
fetchData();
clearBtnTextChange();