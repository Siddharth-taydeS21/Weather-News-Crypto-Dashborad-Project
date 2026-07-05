// ================= EXPORTS AND IMPORTS =====================
export { fetchData };
import { renderCryptoCards, isCryptoSectionLoading, renderAlertList } from "./cryptoUI.js";
import { cKey, Coins, refreshBtn } from './cryptoStates.js'

// ===================== CRYPTO API KEY =======================


const fetchData = async () => {
    // set lLoading State First
    isCryptoSectionLoading('load');

    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=15';
        const response = await fetch(url, {
            headers: {
                'accept': 'application/json',
                'x-cg-demo-api-key': `${cKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json();
        data.forEach(element => {
            Coins.push(element)
        });
        renderCryptoCards(Coins);
        renderAlertList();

    } catch (error) {
        //alert('Could not fetch Crypto Data!');
        isCryptoSectionLoading('error');
    }
}
