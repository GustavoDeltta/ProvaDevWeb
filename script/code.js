var allCountries = [];
var allCountriesDiv = document.querySelector(".allCountries");
var amountCountries = document.querySelector("#amountCountries");

async function queryCountries(url) {
    var response = await fetch("https://restcountries.com/v3.1/" + url);
    var infos = await response.json();

    allCountries = infos;
    showCountries(allCountries);
}

function showCountries(countries){
    allCountriesDiv.innerHTML = "";
    for(country of countries){

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
        countryDiv.addEventListener("click", 
            () => {
                window.location.href = `details.html?country=${country.cca2}`;
            }
        );
        allCountriesDiv.appendChild(countryDiv);
    }
    amountCountries.innerHTML = countries.length
}

function searchCountry(value){
    var searchedCountry = [];
    for(country of allCountries){
        var name = country.name.common.toLowerCase();
        if(name.startsWith(value.toLowerCase())){
            searchedCountry.push(country);
        }
    }

    allCountriesDiv.innerHTML = "";
    amountCountries.innerHTML = searchedCountry.length
    showCountries(searchedCountry);
}

function searchByFilter(value){
    // https://restcountries.com/v3.1/region/asia
    var url = "";
    if(value != "all"){
        url = "region/" + value
    }else{
        url = "all"
    }
    queryCountries(url);
}

queryCountries("all");