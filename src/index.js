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
    console.log(e);
   

    if (e.length > 10){
      
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    }


  if (e.length >= 2 && e.length <= 10){
    
  
    divInfo.innerHTML = '';
    ulEl.innerHTML = '';
    

    const markUp = e.map(country => `<li class="country-item"> <img src = ${country.flags.svg} width="30"> ${country.name.official}</li>`
    ).join(" ");

    

    ulEl.insertAdjacentHTML("beforeend", markUp);
  }

  if (e.length === 1){


    const countryArr = [];

      e.forEach(function callbackFn(country, index){
      countryArr.push(`<div>
       <h2 class="country-title"><img src=${country.flags.svg} width='30' /> ${country.name.official}</h2>
       <div>
       <p class="info-item"><strong>Capital: </strong>${country.capital}</p>
       <p class="info-item"><strong>Population: </strong>${country.population}</p>
       <p class="info-item"><strong>Languages: </strong>${Object.values(country.languages)}</p>
       </div>
       </div>`);
      })


      divInfo.innerHTML = '';
      ulEl.innerHTML = '';
      divInfo.insertAdjacentHTML("beforeend", ...countryArr);
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

