var allCountries = [];
var allCountriesDiv = document.querySelector(".allCountries");

async function queryCountries() {
    var response = await fetch("https://restcountries.com/v3.1/all");
    var infos = await response.json();

    allCountries = infos;
    showCountries(allCountries);
}

function showCountries(countries){
    for(country of countries){
        console.log(country.name.common);

        var countryDiv = document.createElement("div");
        countryDiv.classList.add("country");

        countryDiv.innerHTML = `
            <img 
                class="countryFlag" 
                src="${country.flags.png}" 
                alt="${country.flags.alt}"
            />
            <div class="countryInfos">
                <p>${country.name.common}</p>
            </div>
        `;
        allCountriesDiv.appendChild(countryDiv);
    }
}

function searchCountry(value){
    var searchedCountry = [];
    for(country of allCountries){
        var name = country.name.common.toLowerCase();
        if(name.startsWith(value.toLowerCase())){
            searchedCountry.push(country);
        }
    }

    console.log(searchedCountry)
    allCountriesDiv.innerHTML = "";
    showCountries(searchedCountry);
}

queryCountries();