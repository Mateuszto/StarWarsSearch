import axios from 'axios'
import './scss/style.scss'

const searchFormEl = document.querySelector('#search-form');
const searchInputEl = document.querySelector('#search-input');
const searchOptionEl = document.querySelector('#search-option');

const apiBaseURL = 'https://swapi.co/api';
let searchOption = 'films';

const searchResultsEl = document.querySelector('#search-results');

const generateHTML = (text) => `<li class="list-group-item">${text}</li>`;


const showResults = (searchOption, results) => {
    let html;

    if (searchOption === 'films') {
        html = results.map(result =>
            generateHTML(`<b>Title:</b> ${result.title}, <b>Director: </b> ${result.director}, <b>Producer: </b> ${result.producer}, <b>Release: </b> ${result.release_date}`));
    } else if (searchOption === 'people') {
        html = results.map(result =>
            generateHTML(`<b>Name:</b> ${result.name}, <b>Height: </b> ${result.height}, <b>Mass: </b> ${result.mass}, <b>Hair color: </b> ${result.hair_color}, <b>Birth: </b>${result.birth_year}`));
    }

    searchResultsEl.innerHTML = html.join('');
}

searchOptionEl.addEventListener('change', function (e) {
    searchOption = this.value;
});

searchFormEl.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchValue = searchInputEl.value;

    //https://swapi.co/api/people/?search=r2
    const apiURL = `${apiBaseURL}/${searchOption}/?search=${searchValue}`;

    axios.get(apiURL)
        .then(res => res.data)
        .then(data => {
            console.log(data.results);
            showResults(searchOption, data.results);
        })
        .catch(err => console.log(err))
});