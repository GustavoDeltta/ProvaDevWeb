const infoDivs = document.querySelectorAll('.infos > div'); // Seleciona as divs dentro de .infos
const overlay = document.querySelector('.overlay');
const getUrl = window.location.search;
const URL = new URLSearchParams(getUrl);
const countryId = URL.get('id').toLowerCase();

var countryName = document.querySelector("#countryName");
var officialName = document.querySelector("#officialName");
var population = document.querySelector("#population");
var capital = document.querySelector("#capital");
var language = document.querySelector("#language");
var currency = document.querySelector("#currency");
var flag = document.querySelector(".flag");
var geoArea = document.querySelector("#geoArea");
var maps = document.querySelector("#maps");

async function queryInfos(){
  var response = await fetch(`https://restcountries.com/v3.1/alpha/${countryId}`)
  var infos = await response.json();
  var allInfos = infos[0];



  countryName.innerHTML = `${allInfos.name.common}`;
  officialName.innerHTML = `${allInfos.name.official}`;
  population.innerHTML = `${allInfos.population}`;
  capital.innerHTML = `${allInfos.capital}`;
  var getLanguage = Object.values(allInfos.languages).join(`, `);
  language.innerHTML = `${getLanguage}`;
  var getCurrency = Object.values(allInfos.currencies)[0].name;
  currency.innerHTML = `${getCurrency}`;
  geoArea.innerHTML = `${allInfos.area}`;
  flag.innerHTML = `
    <h2>Flag:</h2>
    <img id="flag" src="${allInfos.flags.svg}" />
  `;

  const lat = allInfos.latlng[0];
  const lng = allInfos.latlng[1];

  var maps = L.map('maps').setView([lat,lng], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(maps);

  L.marker([lat, lng]).addTo(maps)
        .bindPopup(`<a href="${allInfos.maps.googleMaps}"><span>${allInfos.name.common}</span><br><b>Country Location.</b></a>`)
        .openPopup();

}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      infoDivs.forEach(div => div.classList.remove('highlight'));
      entry.target.classList.add('highlight');
    } else {
      entry.target.classList.remove('highlight');
    }
  });

  const isAnyHighlighted = Array.from(infoDivs).some(div => div.classList.contains('highlight'));

  overlay.style.opacity = isAnyHighlighted ? '1' : '0';
  overlay.style.pointerEvents = isAnyHighlighted ? 'auto' : 'none'; 

}, {
    root: null,
    rootMargin: '-50% 0px', 
    threshold: 0
  });

infoDivs.forEach(div => {
    observer.observe(div);
});

document.addEventListener("DOMContentLoaded", function(){
  queryInfos();
});