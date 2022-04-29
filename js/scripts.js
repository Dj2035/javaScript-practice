// IIFE
let pokemonRepository = (function () {
	// List is pokemons
	let pokemonList = [
		{
			name: "Balbasaur",
			height: 7,
			types: ["grass", "poison"],
			weaknesses: ["fire", "psychic", "flying", "ice"]
		},
		{
			name: "Metapod",
			height: 7,
			types: ["bug"],
			weaknesses: ["fire", "flying", "rock"]
		},
		{
			name: "Charmeleon",
			height: 11,
			types: ["monster", "dragon"],
			weaknesses: ["water", "ground", "rock"]
		},
		{
			name: "Pikachu",
			height: 4,
			types: ["field", "fairy"],
			weaknesses: ["ground"]
		}
	];

	//Defining add function to add pokemon to list
	function add(pokemon1, pokemon2) {
		pokemonList.push(pokemon1, pokemon2);
	}
	// adding the typeof function (Needs to be checked)
	/* function add(pokemon1, pokemon2) {
			if (typeof pokemon1 && pokemon2 === "object") {
			pokemonList.push(pokemon1, pokemon2);
			}else {
			document.write(This is not an object);
			}
		}
	*/

	//Defining getAll function to return pokemonList
	function getAll() {
		return pokemonList;
	}

	// Returning getAll and add functions
	return {
		add: add,
		getAll: getAll
	};
})();

// Adding 2 additional pokemons to pokemon list
pokemonRepository.add(
	{
		name: "Wartortle",
		height: 3,
		types: ["water"],
		weaknesses: ["grass", "electric"]
	},
	{
		name: "Caterpie",
		height: 1,
		types: ["bug"],
		weaknesses: ["fire", "flying", "rock"]
	}
)

// Html
document.write("<h1>Available Pokémons</h1>");
document.write("<ul>")

// forEach loop using function that allows to retrieve the pokemon list
pokemonRepository.getAll().forEach(function(pokemon) {
    // condition statement for big pokemon
    let isBig = pokemon.height > 10 ? "- Wow, that's big!" : "";
	document.write(
        `<li><b>${pokemon.name}</b><br> &nbsp&nbsp(height: ${pokemon.height}) ${isBig} </li>`
   );
})
document.write("</ul>")
