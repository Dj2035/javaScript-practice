
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
// iterate through pokemon list and print it with height info to index.html
for ( let i = 0; i<pokemonList.length; i++ ) {
    // add comment to pokemons taller than threshold
    let isBig = pokemonList[i].height > threshold ? "- Wow, that's big!" : "";
	document.write(
        `<li><b>${pokemonList[i].name}</b><br> &nbsp&nbsp(height: ${pokemonList[i].height}) ${isBig} </li>`
    );
}
document.write("</ul>");
