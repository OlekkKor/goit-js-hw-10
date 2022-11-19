import './css/styles.css';

// import countryCardTemp from './templates/country-card.hbs';
// import countryListTemp from './templates/country-list.hbs';

import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
import API from './fetchCountries';
const DEBOUNCE_DELAY = 300;


const inputEl = document.querySelector('#search-box');
const ulEl = document.querySelector('.country-list');
const divInfo = document.querySelector('.country-info');


inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));


  function onInput(e) {
    if (!e.target.value) {
      ulEl.innerHTML = '';
      divInfo.innerHTML = '';
      return;
    }
    const searchCountry = e.target.value.trim();
    API(searchCountry).then(SuccessFn).catch(ErrorFn);

  }

function SuccessFn(e){
    let count = 0;

    const countryArr = e.map(country => country.name.official)

    if (countryArr.length > 10){
      
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    }


  if (countryArr.length >= 2 && countryArr.length < 10){
    
    let countryArray = [];
    let markUp;

    for (let i = 0; i < countryArr.length; i++){

      const countryList = `<li class="country-item"> <img src = ${e[i].flags.svg} width="30"> ${countryArr[i]}</li>`;
      countryArray.push(countryList);
      markUp = countryArray.join(" ");
    }
    ulEl.insertAdjacentHTML("beforeend", markUp);
  }

  if (countryArr.length === 1){

      const countryItem = `<div class='country'>
      <h2 class="country-title"><img src=${e[0].flags.svg} width='30' /> ${e[0].name.official}</h2>
      <div class='info'>
        <p class="info-item"><strong>Capital: </strong>${e[0].capital}</p>
        <p class="info-item"><strong>Population: </strong>${e[0].population}</p>
        <p class="info-item"><strong>Languages: </strong>${Object.values(e[0].languages)}</p>
      </div>
    </div>`; 

      divInfo.insertAdjacentHTML("beforeend", countryItem);
  }

    return;
}

function ErrorFn(e){
  Notiflix.Notify.warning('Oops, there is no country with that name');;
}







VANTA.CLOUDS({
  el: "#cloud",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00
})

