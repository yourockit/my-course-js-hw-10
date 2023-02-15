import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import QueryAPI from './js/query';
import { countriesMarkup, countryMarkup } from './js/markup';
import './css/styles.css';

const DEBOUNCE_DELAY = 500;

const refs = {
    input: document.querySelector('#search-box'),
    countryInfo: document.querySelector('.country-info'),
    countryList: document.querySelector('.country-list'),
}

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

const fetchCountries = new QueryAPI();

function onInputChange(e) {
    fetchCountries.query = e.target.value.trim();
    if (e.target.value === '') {
        clear();
        return;
    };
    fetchCountries.fetchQuery()
        .then(countries => {
            if (countries.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                return;
            };
            if (countries.length > 1 && countries.length <= 10) {
                const listMarkup = countries.map(country => countriesMarkup(country)).join('');
                refs.countryInfo.innerHTML = '';
                refs.countryList.innerHTML = listMarkup;
            };

            if (countries.length === 1) {
                const unitMarkup = countries.map(country => countryMarkup(country)).join('');
                refs.countryList.innerHTML = '';
                refs.countryInfo.innerHTML = unitMarkup;
            };
        }).catch(error => {
            Notiflix.Notify.failure('Oops, there is no country with that name');
            clear();
            return error;
        })
};

function clear() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
};