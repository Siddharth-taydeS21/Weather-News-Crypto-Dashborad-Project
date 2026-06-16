// ===================== IMPORTS & EXPORTS ==============================
export { renderCryptoCards, attachAlertHandlers, renderAlertList, notify, isCryptoSectionLoading };
import { returnGrowthColor, clearBtnTextChange } from "./utils.js";
import { alerts, alertsContainer, Coins } from "./cryptoStates.js";

const CryptoCoinCardTemplate = document.getElementById('Crypto_coin_card_template');
const CryptoCardsGrid = document.querySelector('.crypto_cards_grid');
const LoadingCryptoCoinCardTemplate = document.querySelector('#Loading_crypto_card_template');
const ErrorCryptoCoinCardTemplate = document.querySelector('#Error_crypto_card_template');

// LOADING STATE FOR CRYPTO CARD GRID 
const isCryptoSectionLoading = (str) => {
    if (str === 'load') {
        for (let i = 0; i < 10; i++) {
            CryptoCardsGrid.append(
                LoadingCryptoCoinCardTemplate.content.cloneNode(true)
            )
        }
    } else if (str === 'error') {
        CryptoCardsGrid.innerHTML = '';
        CryptoCardsGrid.append(
            ErrorCryptoCoinCardTemplate.content.cloneNode(true)
        )
    }
} 


const renderAlertList = () => {
    const list = JSON.parse(localStorage.getItem('crypto_alerts'));

    if (list) {
        const arrayList = Object.entries(list);
        alertsContainer.innerHTML = '';
        arrayList.forEach(alert => {
            const el = document.createElement('div');
            el.classList.add('flex', 'justify-between', 'items-center')
            el.id = 'remove'
            el.dataset.remove = `${alert[0]}`
            el.innerHTML += `
            <h1 class="font-semibold">${alert[0].charAt(0).toUpperCase() + alert[0].slice(1)} -- $${alert[1]}</h1>
            <button class="p-[.3rem_1rem] rounded-lg shadow-sm border border-gray-200" type="button">Remove</button>
            `;
            alertsContainer.append(el);
        });
    }

    clearBtnTextChange();

    // ========== REMOVE ALERTS ON REMOVE BTN CLICK FUNCTIONALITY ===========
    const removeBtns = document.querySelectorAll('#remove');
    removeBtns.forEach(el => {
        el.addEventListener('click', () => {
            const coinId = el.dataset.remove;
            if (list) {
                const arrayList = Object.entries(list);
                arrayList.find(coin => {
                    if (coin[0] === coinId) {
                        delete alerts[coin[0]];
                        localStorage.setItem('crypto_alerts', JSON.stringify(alerts));
                        renderAlertList();
                    }
                });
            }
        })
    })  
    checkAlerts();
}  


const renderCryptoCards = (arr) => {
    CryptoCardsGrid.innerHTML = '';
    arr.forEach(coin => {
        const card = CryptoCoinCardTemplate.content.cloneNode(true);
        // // console.log(coin);
        card.querySelector('#coin_img').src = coin.image;
        const coinName = card.querySelector('.coin_name');
        coinName.textContent = coin.name;
        card.querySelector('.coin_code').textContent = coin.symbol.toUpperCase();
        card.querySelector('.price .main_price').textContent = `$${Math.ceil(coin.current_price)}`;
        const growth = returnGrowthColor(coin.price_change_percentage_24h);
        // console.log(coin.price_change_percentage_24h)
        // console.log(growth)
        card.querySelector('.price').innerHTML += growth;
        card.querySelector('.market_cap span:nth-child(2)').textContent = `$${coin.market_cap.toLocaleString('en-US')}`;

        // setting datasets for alerts functionalities
        coinName.dataset.name = `${coin.id}`;

        const coinField = card.querySelector('#alert');
        coinField.dataset.filed = `${coin.id}`

        const coinAlertBtn = card.querySelector('.set_alert_btn');
        coinAlertBtn.dataset.alertBtn = `${coin.id}`

        // console.log(coinName);
        // console.log(coinField);
        // console.log(coinAlertBtn);
        CryptoCardsGrid.append(card);
    });
    attachAlertHandlers();
    clearBtnTextChange();
} 


const attachAlertHandlers = () => {
    const alertBtns = CryptoCardsGrid.querySelectorAll('.set_alert_btn');

    alertBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const coinId = btn.dataset.alertBtn;
            const coinNameId = `[data-name="${coinId}"]`;
            const coinName = document.querySelector(coinNameId).textContent;
            const FieldId = `[data-filed="${coinId}"]`
            const Field = document.querySelector(FieldId);
            let value = Number(Field.value);

            if (value <= 0 && !value) {
                alert('please enter a valid number for alert amount..');
                return;
            };

            alerts[coinId] = value;
            localStorage.setItem('crypto_alerts', JSON.stringify(alerts));
            Field.value = '';
            renderAlertList();
        })
    })
}   

const notify = async (massage) => {
    if (!Notification in window) {
        alert('This browser does not support to show notifications.');
        return;
    }

    const permission = await Notification.requestPermission();

    if(permission === 'granted'){
        const notification = new Notification('Crypto Alert :', {
            body: massage
        })
    }else if (permission === 'denied'){
        alert('You will not be able to get important alert Notifications form Crypto Dashboard. Please Allow Notifications to precede');
        Notification.requestPermission();
    } else {
        console.log('Permission dismissed by the user.');
    }
} 

// check alerts and notify functionality
const checkAlerts = () => {
    const list = JSON.parse(localStorage.getItem('crypto_alerts'));
    if (list) {
        const arrayList = Object.entries(list);
        arrayList.forEach(alert => {
            const Name = alert[0];
            const targetPrice = alert[1];
            const coin = Coins.find(c => c.id === Name);
            const currentPrice = coin.current_price;
            if (targetPrice > currentPrice) {
                notify(`${Name}'s current Price is ${currentPrice}, and Your Target was ${targetPrice}, Target Reached! You can invest Now!`);
                setTimeout(() => {
                    delete alerts[Name];
                    localStorage.setItem('crypto_alerts', JSON.stringify(alerts));
                    renderAlertList();
                }, 3000)
            }
        })
    }
} 

