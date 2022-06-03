const countries = document.querySelector(".countries");
const inputCountry = document.getElementById("c-input");
const filterByRegion = document.getElementById("filter");
const darkmodeBtn = document.getElementById("color-theme");
const moon = document.querySelector(".bi-moon");
const nav = document.querySelector(".navbar");
const inputDark = document.querySelector(".inputs input");
const selectDark = document.querySelector(".inputs select");

function removeper20(string) {
  let newStr = "";
  for (i = 0; i < string.length; i++) {
    newStr += string[i].replace(" ", "-");
  }
  return newStr;
}

const getCountries = () => {
  let output = "";
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((country) => {
        output += `
          <div class="country">
                <div class="country-flag">
                    <img src="${country.flags.png}" alt="flag">
                </div>
                <a href= "detail.html?=${removeper20(
                  country.name.common
                )}" target="_blank">
                <div class="country-body">
                    <h1>${country.name.common}</h1>
                    <p>Population: ${
                      country.population == 0
                        ? "No Population"
                        : country.population.toLocaleString()
                    }</p>
                    <p>Region: ${country.region}</p>
                    <p>Capital: ${
                      country.capital == undefined
                        ? "No Capital"
                        : country.capital
                    }</p>
                </div>
                </a>
            </div>`;
      });
      countries.innerHTML = output;
      const country = document.querySelectorAll(".country-body");
      country.forEach((count) => {
        count.addEventListener("click", () => {
          localStorage.setItem("country", count.firstElementChild.innerHTML);
        });
      });
    });
};

const searchCountry = async () => {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${inputCountry.value}`
  );
  const data = await res.json();
  let output = "";
  if (data.status === 404) {
    countries.innerText = `No Result Found!`;
  } else {
    data.forEach((country) => {
      output += `
    <div class="country">
                <div class="country-flag">
                    <img src="${country.flags.png}" alt="flag">
                </div>
                <a href= "detail.html?=${removeper20(
                  country.name.common
                )}" target="_blank">
                <div class="country-body">
                    <h1>${country.name.common}</h1>
                    <p>Population: ${
                      country.population == 0
                        ? "No Population"
                        : country.population.toLocaleString()
                    }</p>
                    <p>Region: ${country.region}</p>
                    <p>Capital: ${
                      country.capital == undefined
                        ? "No Capital"
                        : country.capital
                    }</p>
                </div>
                </a>
            </div>`;
    });
  }
  countries.innerHTML = output;
  const country = document.querySelectorAll(".country-body");
  country.forEach((count) => {
    count.addEventListener("click", () => {
      localStorage.setItem("country", count.firstElementChild.innerHTML);
    });
  });
};

const filterCountries = async (e) => {
  const filterCountry = e.target.value;
  const res = await fetch(
    `https://restcountries.com/v3.1/region/${filterCountry}`
  );
  const data = await res.json();
  let output = "";
  data.forEach((country) => {
    output += `
    <div class="country">
                <div class="country-flag">
                    <img src="${country.flags.png}" alt="flag">
                </div>
      <a href= "detail.html?=${removeper20(
        country.name.common
      )}" target="_blank">
                <div class="country-body">
                    <h1>${country.name.common}</h1>
                    <p>Population: ${
                      country.population == 0
                        ? "No Population"
                        : country.population.toLocaleString()
                    }</p>
                    <p>Region: ${country.region}</p>
                    <p>Capital: ${
                      country.capital == undefined
                        ? "No Capital"
                        : country.capital
                    }</p>
                </div>
                </a>
            </div>`;
  });
  countries.innerHTML = output;
  const country = document.querySelectorAll(".country-body");
  country.forEach((count) => {
    count.addEventListener("click", () => {
      localStorage.setItem("country", count.firstElementChild.innerHTML);
    });
  });
};

const darkFunction = () => {
  document.body.classList.toggle("dark-mode");
  nav.classList.toggle("dark-mode");
  inputDark.classList.toggle("input-dark-mode");
  selectDark.classList.toggle("select-dark-mode");
  moon.classList.remove("bi-moon");
  moon.classList.add("bi-moon-fill");
};

getCountries();

inputCountry.addEventListener("input", searchCountry);

filterByRegion.addEventListener("change", (e) => {
  filterCountries(e);
});

darkmodeBtn.addEventListener("click", (e) => {
  darkFunction();
  e.target.classList.toggle("dark-mode");
});
