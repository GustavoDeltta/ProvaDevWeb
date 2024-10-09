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

        countryDiv.id = country.cca2;
        countryDiv.addEventListener("click", openPageDetails);
        allCountriesDiv.appendChild(countryDiv);
    }
    amountCountries.innerHTML = countries.length
}

function openPageDetails(event){
    var countryId;
    if(event.target.className != "country"){
        countryId = event.target.parentElement.id;
    }else{
        countryId = event.target.id;
    }
    window.location.href = `./details.html?id=${countryId}`
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
    var url = "";
    if(value != "all"){
        url = "region/" + value
    }else{
        url = "all"
    }
    queryCountries(url);
}

queryCountries("all");