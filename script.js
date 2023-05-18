const searchBox = document.querySelector("form");
const countries = document.querySelector(".countries");
const searchInput = document.querySelector("input");

searchBox.addEventListener("submit", (e) => {
    e.preventDefault();

    const countryName = searchInput.value;

    getCountryData(countryName);
});

async function getCountryData(name) {
    try {
        const res = await fetch(`https://restcountries.com/v2/name/${name}`);

        const data = (await res.json())[0];

        console.log(data);

        countries.innerHTML = ""

        let html = `
        <article class="country">
          <img class="country__img" src=${data.flag} />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
        `;

        countries.insertAdjacentHTML("beforeend", html);
        getNeighbourCountryData(data.borders[0]);
    } catch (error) {
        console.log(error)
    }
}

async function getNeighbourCountryData(code){
    try {
        const res = await fetch(`https://restcountries.com/v2/alpha/${code}`);

        const data = await res.json();
        console.log(data);
        let html = `
        <article class="country neighbour">
          <img class="country__img" src=${data.flag} />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
        `;
        
        countries.insertAdjacentHTML("beforeend", html);
    } catch (error) {
        
    }
}
