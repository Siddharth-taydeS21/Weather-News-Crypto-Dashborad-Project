export { notificationBtn, refreshBtn, alertsContainer, clearAlertsBtn, Coins, alerts, cKey };
import { renderAlertList } from "./cryptoUI.js";
import { fetchData } from "./cryptoAPI.js";

const cKey = import.meta.env.VITE_CRYPTO_API_KEY;

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
                notificationBtn.textContent = 'Notifications Enabled';
            }else if (permission === 'denied'){
                alert('You will never receive Notification If you used alert in Crypto price tracker, if you want us to Notify on alerts then make sure to Allow Notifications')
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