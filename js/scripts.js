// IIFE
let pokemonRepository = (function () {
	// Initialize pokemon list
	let pokemonList = [];

	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
		let list = document.querySelector('.pokemon-list');

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
		button.addEventListener('click', (event) => showDetails(pokemon));
	}

	// Function for showing pokemon details
	function showDetails(pokemon) {
		loadDetails(pokemon).then( () => console.log(pokemon));
	}

	function loadingMessageHidden(hide) {
		let loadingMessage = document.querySelector('.loading-message')
		if (hide) {
			loadingMessage.classList.add('hidden');
		} else {
			loadingMessage.classList.remove('hidden');
		}
	}

	function loadList() {
		loadingMessageHidden(false);
		return fetch(apiUrl).then(function (response) {
			loadingMessageHidden(true);
			return response.json();
		}).then(function (json) {
			loadingMessageHidden(true);
			json.results.forEach(function (item) {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url
				};
				add(pokemon);
			});
		}).catch(function (e) {
			loadingMessageHidden(true);
			console.error(e);
		});
	}

	function loadDetails(item) {
		loadingMessageHidden(false);
		let url = item.detailsUrl;
		return fetch(url).then(function (response) {
			loadingMessageHidden(true);
			return response.json();
		}).then(function (details) {
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
      item.types = details.types;
		}).catch(function (e) {
			loadingMessageHidden(true);
			console.error(e);
		});
	}

	// Returning getAll add, add functions
	return {
		add:add,
		getAll:getAll,
		addListItem:addListItem,
		showDetails:showDetails,
		loadList:loadList,
		loadDetails:loadDetails
	};
})();

//loading data from pokemon url
pokemonRepository.loadList().then(function() {
	// forEach loop using function that allows to retrieve the pokemon list
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
