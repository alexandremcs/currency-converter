const dropList =  document.querySelectorAll(".drop-list select");
const fromCurrency =  document.querySelector(".from select");
const toCurrency =  document.querySelector(".to select");
const getBtn = document.querySelector("form button");

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
}

getBtn.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if (amountValue == "" || amountValue == "0") {
        amount.value = "1"
        amountValue = '1'
    }
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
    fetch(url).then(response => console.log(response.json()));
}
