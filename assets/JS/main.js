// ===================== IMPORTS & EXPORTS ==================
import { getGeoLocation, getWeatherDetails, WeatherForecastObjects, getUserLocation } from './wetherAPI.js'
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

getGeoLocation();