export { notificationBtn, refreshBtn, alertsContainer, clearAlertsBtn, Coins, alerts, CRYPTO_API_KEY };
import { renderAlertList } from "./cryptoUI.js";
import { fetchData } from "./cryptoAPI.js";

const CRYPTO_API_KEY = import.meta.env.VITE_CRYPTO_API_KEY;

const refreshBtn = document.querySelector('.refreshBtn');
const notificationBtn = document.querySelector('.notificationBtn');
const alertsContainer = document.querySelector('.crypto_alerts_list');
const clearAlertsBtn = document.querySelector('.clearBtn');

const CryptoCardsGrid = document.querySelector('.crypto_cards_grid');

// Global variable to store Crypto Data
let Coins = [];
let alerts = JSON.parse(localStorage.getItem('crypto_alerts') || '{}');

// clear all alerts functionality
clearAlertsBtn.addEventListener('click', () => {
    alerts = {};
    localStorage.setItem('crypto_alerts', JSON.stringify(alerts));
    renderAlertList();
})

// ask for Notification permission & notify btn text change on click functionality
const AskForNotifications = () => {
    if (!Notification in window) {
        console.log('This browser does not support to show notifications.');
        return;
    }
    
    const perm = Notification.permission;
    if (perm === 'granted') {
        notificationBtn.textContent = 'Notifications Enabled'
    }
    else{
        notificationBtn.textContent = 'Enable Notifications';
        notificationBtn.addEventListener('click', async () => {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Permission Granted!')
                notificationBtn.textContent = 'Notifications Enabled';
            }else if (permission === 'denied'){
                console.log('Permission Denied..')
            }
        })
    }
}
AskForNotifications()

// refresh btn functionality 
refreshBtn.addEventListener('click', () => {
    Coins = [];
    CryptoCardsGrid.innerHTML = '';
    fetchData();
})

// Refresh Every 60 seconds 
setInterval(() => {
    Coins = [];
    CryptoCardsGrid.innerHTML = '';
    fetchData();
}, 60000)