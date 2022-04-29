
// set variables
let threshold = 10;

// List of Pokemons
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

document.write("<h1>Available Pokémons</h1>");
document.write("<ul>");
// command to iterate through pokemon list and print it with height info to index.html
pokemonList.forEach(function(item) {
    // add comment to pokemons taller than threshold
    let isBig = item.height > threshold ? "- Wow, that's big!" : "";
	document.write(
        `<li><b>${item.name}</b><br> &nbsp&nbsp(height: ${item.height}) ${isBig} </li>`
   );
})
document.write("</ul>");
