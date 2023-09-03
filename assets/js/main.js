const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modal = document.getElementById('pokemonModal');
const closeModalButton = modal.querySelector('.close-button');


const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    console.log(pokemon)
    return `
        <li class="pokemon ${pokemon.type}">
            <a class="pokemon-link">
                <div class="header">
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${pokemon.number}</span>
                </div>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </a>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function openPokemonModal(pokemon) {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p>Number: #${pokemon.number}</p>
        <p>Type: ${pokemon.types.join(', ')}</p>
        <p>Abilities: ${pokemon.abilities}</p> <!-- Não use .join() aqui -->
        <p>Species: ${pokemon.species}</p>
        <p>Height: ${pokemon.height} decimetres</p>
        <p>Weight: ${pokemon.weight} hectograms</p>        
    `;

    modal.style.display = 'block';
}

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

pokemonList.addEventListener('click', (event) => {
    const clickedPokemon = event.target.closest('.pokemon-link');
    if (clickedPokemon) {
        const pokemonIndex = Array.from(pokemonList.children).indexOf(clickedPokemon.parentElement);
        const selectedPokemon = pokemons[pokemonIndex]; // Acesse a variável pokemons que contém os dados dos Pokémon.

        openPokemonModal(selectedPokemon);
    }
});