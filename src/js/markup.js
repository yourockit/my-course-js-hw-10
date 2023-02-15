export function countriesMarkup({ flags, name }) {
    return `<li><img src="${flags.svg}" width="40"><span>${name.official}</span></li>`;
};

export function countryMarkup({ flags, name, capital, population, languages }) {
    return `<ul>
<li><img src="${flags.svg}" width="40"><span>${name.official}</span></li>
<li>Capital: ${capital}</li>
<li>Population: ${population}</li>
<li>Languages: ${Object.values(languages)}</li>
</ul>`
};