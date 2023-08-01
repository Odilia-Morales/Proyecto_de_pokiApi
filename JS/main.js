
const apiUrl = "https://pokeapi.co/api/v2/pokemon/"
const inputSearch = document.querySelector('#inputSearch');
const searchButton = document.querySelector('#searchButton');
const pokemonInfo = document.querySelector('#pokemonInfo');
let pokemonStats = null;

function handleRequestSearch(event) {
    /*Saneamiento de entrada: convertir a minusculas*/
    const pokemonName = inputSearch.value.toLowerCase();
    fetch(`${apiUrl}${pokemonName}`)
    .then(response => {
         console.log("Respuesta: ", response);
         return response.json();
    })
    .then(data => { 
        console.log(data);
        displayPokemon(data) 
    })
    .catch(err => {
        console.error(err)
        showErrorMessage();
    });
        
}

function displayPokemon(pokemon) {
    pokemonInfo.innerHTML = `
    <h2>${capitalizeFirstLetter(pokemon.name)}</h2>
    <img src="${pokemon.sprites.front_default}">
    <p>peso: ${pokemon.weight} Lbs</p> 
    <p>Altura: ${pokemon.height} In</p>
    <h3>Habilidades</h3>
    <ul>
     ${pokemon.abilities
        .map(element => `<li>${capitalizeFirstLetter(element.ability.name)}</li>`) 
        .join("")
        }
    </ul>
    <h3>Movimientos</h3>
    <ul>
    ${pokemon.moves
        .slice(0, 5)
        .map(element => `<li>${capitalizeFirstLetter(element.move.name)}</li>`) 
        .join("")
        }
        </ul>
    `
    const arrayStats = pokemon.stats.map(element => element.base_stat);

    /* Mocup data*/
const data = {
  labels: [
    'HP',
    'ATTACK',
    'DEFENSE',
    'SPECIAL ATTACK',
    'SPECIAL DEFENSE',
    'SPEED',
    
  ],
  datasets: [{
    label: pokemon.name?? "", /*Debe ser dinamico*/
    data: [...arrayStats], /*Debe ser dinamico*/
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  
  }]
};

    /*  Config */
const config = {
  type: 'radar',
  data: data,
  options: {
    elements: {
      line: {
        borderWidth: 3
      }
    }
  },
};
if (pokemonStats) {
  pokemonStats.destroy();
}
pokemonStats = new Chart(document.querySelector('#graphic'), config, data)

}

const showErrorMessage = () => pokemonInfo.innerHTML = `<P>No se encontro informacin para el pokemon ingresado.
 intente nuevamente.</p>` 

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

searchButton.addEventListener('click', handleRequestSearch)

