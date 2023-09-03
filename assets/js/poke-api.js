
const pokeApi = {}
let pokemons = []

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default    

    const pokemonAbilities = pokeDetail.abilities.map((pokeAbilities) => pokeAbilities.ability.name).join(', ');
    pokemon.abilities = pokemonAbilities;

    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemonsList) => {
            const pokemonDetailPromises = pokemonsList.map((pokemon) =>
                pokeApi.getPokemonDetail(pokemon)
            );

            return Promise.all(pokemonDetailPromises);
        })
        .then((pokemonsDetails) => {
            // Armazene os dados dos Pokémon na variável pokemons.
            pokemons = pokemonsDetails;
            return pokemonsDetails;
        });
};
