import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountry from "./api-service";
import countryCardTpl from "./teamplates/card-country.hbs"
import getRefs from "./get-refs";
import listCard from './teamplates/base-card.hbs'
import  debounce  from "lodash.debounce";
const DEBOUNCE_DELAY = 300;


function onSearch(e) {
  e.preventDefault();
 const inputValue =  e.target.value;
  if(!inputValue) {

   return  Notiflix.Notify.info('Enter country name');
  }
  getRefs().cardContainerInfo.innerHTML='';
  getRefs().cardContainerList.innerHTML = '';
  fetchCountry(inputValue).then(renderCountryCard).catch(onFetchError)
}

function renderCountryCard(country) {
  if (country.length > 10) {
   return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (country.length >= 2 && country.length <= 10) {
      const markUpList = listCard(country);
      getRefs().cardContainerList.innerHTML=markUpList;
    return Notiflix.Notify.success(`Quantity countries ${country.length}`);
  }
  const markUp = countryCardTpl(country);
  getRefs().cardContainerInfo.innerHTML=markUp;
}

function onFetchError(error) {
  return Notiflix.Notify.failure("Oops, there is no country with that name");
}

getRefs().searchBox.addEventListener('input', debounce(onSearch,DEBOUNCE_DELAY) )



