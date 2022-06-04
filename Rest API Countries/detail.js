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
            <h3>Border Countries:</h3>
            </div>
            <div class="country-border">
            ${country.borders ? decentralized2(country.borders) : "No Borders"}
        </div>
        </div>`;
      });
      document.querySelector(".spinner-border").style.display = "none";
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
  backBtn.classList.toggle("input-dark-mode");
  const borders = document.querySelectorAll(".borders");
  borders.forEach((border) => {
    border.classList.toggle("border-dark-mode");
  });
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
  let realOutput = "";
  for (i = 0; i < arr.length; i++) {
    fetch(`https://restcountries.com/v3.1/alpha/${arr[i]}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.removeItem("borders");
        output = data[0].name.common;
        localStorage.setItem("borders", output);
        realOutput += `<h4 class ="borders">${localStorage.getItem(
          "borders"
        )}</h4>`;
        document.querySelector(".country-border").innerHTML = realOutput;
        document.querySelectorAll(".borders").forEach((border) => {
          border.addEventListener("click", (e) => {
            const border = e.target.innerHTML;
            fetch(`https://restcountries.com/v3.1/name/${border}?fullText=true`)
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
            <h3>Border Countries:</h3>
            </div>
            <div class="country-border">
             ${country.borders ? decentralized2(country.borders) : "No Borders"}
        </div>
        </div>`;
                });
                document.querySelector(".spinner-border").style.display =
                  "none";
                detailDiv.innerHTML = output;
              });
          });
        });
      });
  }
}

darkmodeBtn.addEventListener("click", (e) => {
  darkFunction();
  e.target.classList.toggle("dark-mode");
});
