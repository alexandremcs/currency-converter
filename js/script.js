const dropList =  document.querySelectorAll(".drop-list select");
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