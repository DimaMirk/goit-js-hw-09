import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
import coutriesList from './template/marcap-list.hbs';
import coutriesCard from './template/marcap-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryCard: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const inputValue = refs.searchBox.value.trim();

  refs.countryList.innerHTML = '';
  refs.countryCard.innerHTML = '';

  if (inputValue.length < 2) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  fetchCountries(inputValue)
    .then(country => {
      checkDataLength(country);
    })
    .catch(showError);
}

function checkDataLength(countryArr) {
  if (countryArr.length > 1) {
    buildCountryList(countryArr);
    return;
  }
  buildCountryCard(countryArr);
}

function buildCountryList(data) {
  const list = data.reduce((acc, country) => {
    return acc + coutriesList(country);
  }, '');
  refs.countryList.insertAdjacentHTML('beforeend', list);
}

function buildCountryCard([data]) {
  const cardMarcup = coutriesCard(data);

  refs.countryCard.insertAdjacentHTML('beforeend', cardMarcup);
}

function showError(error) {
  Notify.failure('Oops, there is no country with that name');
}
