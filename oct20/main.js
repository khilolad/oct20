const apikey = 'ed5d2d909ee27250cfadc390'
const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const resultEl = document.getElementById('result');
const button = document.getElementById('convert');
const change = document.getElementById('switch');

async function LoadCurrencies(){
    try{
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${apikey}/latest/USD`);
        const data = await res.json();
        const currencies = Object.keys(data.conversion_rates);
        currencies.forEach(cur => {
            const option1 = document.createElement('option');
            option1.value = cur;
            option1.textContent = cur;
            fromSelect.appendChild(option1);
            const option2 = document.createElement('option');
            option2.value = cur;
            option2.textContent = cur;
            toSelect.appendChild(option2);
        });
    } catch (error) {
        console.error(error);
        alert('Error!!')

    }
}
async function convertCurrency(){
    const amount = parseFloat(amountInput.value);
    const from = fromSelect.value;
    const to = toSelect.value;
    if (!amount || isNaN(amount)) {
        alert('smth smth smth');
        return;
    }
    try{
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${apikey}/latest/${from}`)
        const data = await res.json();
        const rate = data.conversion_rates[to];
        const converted = (amount * rate).toFixed(2);
        resultEl.textContent = `${amount} ${from} = ${converted} ${to}`;

    }catch(error){
        console.error(error);
        alert('Error');

    }
}
button.addEventListener('click', convertCurrency);
LoadCurrencies();