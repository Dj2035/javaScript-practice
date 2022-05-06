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

	// adding the typeof function (Needs to be checked)
	function add(pokemon) {
		if (typeof pokemon === "object" && !Array.isArray(pokemon)) {
		pokemonList.push(pokemon);
		}else {
		console.log("pokemon is not correct");
		}
	}

	//Defining getAll function to return pokemonList
	function getAll() {
		return pokemonList;
	}

	function addListItem(pokemon) {
		let list = document.querySelector('ul');

		let listItem = document.createElement('li');

		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('pokemon-button');

		listItem.appendChild(button);
		list.appendChild(listItem);
		addListener(button, pokemon);
	}

	// Function for adding event listener to pokemon buttons that listen to a click
	function addListener (button, pokemon) {
		button.addEventListener('click', function() {
		showDetails(pokemon.name);
	});
	}

	// Function for showing pokemon details
	function showDetails(pokemon) {
		console.log(pokemon);
	}

	// Returning getAll add, add functions
	return {
		add:add,
		getAll:getAll,
		addListItem:addListItem,
		showDetails:showDetails
	};
})();

// Adding 2 additional pokemons to pokemon list
const newPokemons = [
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
];

newPokemons.forEach(function(newPokemons) {
	return pokemonRepository.add(newPokemons)
});

// forEach loop using function that allows to retrieve the pokemon list
pokemonRepository.getAll().forEach(function(pokemon) {
	pokemonRepository.addListItem(pokemon);

    // condition statement for big pokemon
   //let isBig = pokemon.height > 10 ? "- Wow, that's big!" : "";

	//document.write(
    //    `${pokemon.name}</b><br> &nbsp&nbsp(height: ${pokemon.height}) ${isBig}`
  // );
})
