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

//=====================================================
const wKey = import.meta.env.VITE_WETHER_API_KEY;

const getLocalStorageCoordinates = () => {
    const coordinates = JSON.parse(localStorage.getItem('Weather_coordinates'));
    if (!coordinates) {
        return;
    }else{
        //lat, lon, cityName, wKey
        const lat = coordinates[0];
        const lon = coordinates[1];
        const cityName = coordinates[2];

        getWeatherDetails({lat, lon, cityName, wKey});
    }
}

getLocalStorageCoordinates();
getGeoLocation();
fetchData();
clearBtnTextChange();