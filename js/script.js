const dropList =  document.querySelectorAll(".drop-list select");
const fromCurrency =  document.querySelector(".from select");
const toCurrency =  document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exchangeIcon = document.querySelector(".drop-list .icon");

for (let i = 0; i < dropList.length; i++) {
    for(currency_code in country_code){
        
        let selected;

        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        }else if(i == 1){
            selected = currency_code == "BRL" ? "selected" : "";
        }

        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });   
}

function loadFlag(element){
    for (code in country_code){
        if (code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            let countryFlag = country_code[code].toString().toLowerCase()
            imgTag.src = `https://flagicons.lipis.dev/flags/4x3/${countryFlag}.svg`;
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
});

getBtn.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

exchangeIcon.addEventListener("click", () => {
    let tempChange = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempChange;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    exchangeRateTxt = document.querySelector(".exchange-rate");

    let amountValue = amount.value;
    if (amountValue == "" || amountValue == "0") {
        amount.value = "1"
        amountValue = '1'
    }
    
    exchangeRateTxt.innerText = `Aguardando conversão...`;

    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountValue * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() => {
        exchangeRateTxt.innerText = 'Algo deu errado.';
    });
}
