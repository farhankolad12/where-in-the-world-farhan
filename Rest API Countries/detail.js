const countryName = localStorage.getItem("country");
const detailDiv = document.querySelector(".main-detail");
const darkmodeBtn = document.querySelector("#color-theme");
const moon = document.querySelector(".bi-moon");
const backBtn = document.querySelector(".back-btn button");

const getDetailCountry = () => {
  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then((data) => {
      let output = "";
      data.forEach((country) => {
        output += `<div class="detail-country">
        <div class="detail-country-flag">
            <img src="${country.flags.png}" alt="flag">
        </div>
        <div class="detail-body">
        <div class="part-one">
            <h1>${country.name.common}</h1>
            <p>Native Name: ${decentralized(country.name.nativeName).common}</p>
            <p>Population: ${
              country.population
                ? country.population.toLocaleString()
                : "No Population"
            }</p>
            <p>Region: ${country.region}</p>
            <p>Sub Region: ${
              !country.subregion ? "No Sub Region" : country.subregion
            }</p>
            <p>Capital: ${!country.capital ? "No Capital" : country.capital}</p>
            </div>
        <div class="part-two">
            <p>Top Level Domain: ${country.tld[0]}</p>
            <p>Currencies: ${
              !country.currencies
                ? "No Currencies"
                : decentralized(country.currencies).name
            }</p>
            <p>Languages: ${decentralized1(country.languages)}</p>
            </div>
        </div>
        <div class="country-border">
            <h3>Border Countries: ${
              country.borders ? decentralized2(country.borders) : "No Borders"
            }</h3>
        </div>
        </div>`;
      });
      detailDiv.innerHTML = output;
    })
    .catch((err) => {
      detailDiv.innerHTML = `<h2>No Results Found!</h2>`;
    });
};

window.onload = function () {
  getDetailCountry();
};

const darkFunction = () => {
  document.body.classList.toggle("dark-mode");
  backBtn.classList.toggle("dark-mode");
  moon.classList.remove("bi-moon");
  moon.classList.add("bi-moon-fill");
};

function decentralized(string) {
  for (var prop in string) {
    return string[prop];
    break;
  }
}

function decentralized1(string) {
  let newStr = "";
  for (var prop in string) {
    newStr += `${string[prop]}, `;
  }
  return newStr;
}

function decentralized2(arr) {
  let output = "";
  for (i = 0; i < arr.length; i++) {
    fetch(`https://restcountries.com/v3.1/alpha/${arr[i]}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.removeItem("borders");
        output += data[0].name.common + ", ";
        localStorage.setItem("borders", output);
      });
  }
  return localStorage.getItem("borders");
}

darkmodeBtn.addEventListener("click", (e) => {
  darkFunction();
  e.target.classList.toggle("dark-mode");
});

setTimeout(myGreeting, 1000);

function myGreeting() {
  window.top.location = window.top.location;
  myStopFunction(myGreeting());
}

function myStopFunction() {
  clearTimeout(myTimeout);
}
