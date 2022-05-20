// IIFE
let pokemonRepository = (function () {
	// Initialize pokemon list
	let pokemonList = [];

	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	let modalContainer = document.querySelector('#modal-container');

	// adding the typeof function (Needs to be checked)
	function add(pokemon) {
		if (pokemon.name && pokemon.detailsUrl) {
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

		let buttonItem = document.createElement('button');
		buttonItem.innerText = pokemon.name;
		buttonItem.classList.add('pokemon-button');

		listItem.appendChild(buttonItem);
		list.appendChild(listItem);
		// calling the pokemon botton listener function that shows pokemon details when clicked on
		addListener(buttonItem, pokemon);
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
      let types = [];
			details.types.forEach((item) => types.push(item.type.name));
			item.types = types;
		}).catch(function (e) {
			loadingMessageHidden(true);
			console.error(e);
		});
	}

	// Function for showing pokemon details
	function showDetails(pokemon) {
		loadDetails(pokemon).then(function() {
			showModal(pokemon);
		});
	}

	// Function for adding event listener to pokemon buttons that listen to a click
	function addListener (button, pokemon) {
		button.addEventListener('click', (event) => showDetails(pokemon));
	}

	function showModal(pokemon) {
		// Clear all existing modal content
		modalContainer.innerHTML = '';

		let modal = document.createElement('div');
		modal.classList.add('modal');

		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'Close';
		// hiding modal by clciking on 'close' in the modal
		closeButtonElement.addEventListener('click', hideModal);

		let imgElement = document.createElement('img');
		imgElement.scr = pokemon.imageUrl;
		imgElement.classList.add('pokemon-front-image');
		imgElement.setAttribute('src', 'image of ' + pokemon.name);

		let titleElement = document.createElement('h2');
		titleElement.innerText = pokemon.name;

		let heightElement = document.createElement('p');
		heightElement.innerText = `Height: ${pokemon.height}`;

		let typesElement = document.createElement('p');
		typesElement.innerText = `Types: ${pokemon.types.join(', ')}`;

		// appending elements to the modal div
		modal.appendChild(closeButtonElement);
		modal.appendChild(titleElement);
		modal.appendChild(heightElement);
		modal.appendChild(typesElement);
		modal.appendChild(imgElement);
		modalContainer.appendChild(modal);

		modalContainer.classList.add('is-visible');
	}

	function hideModal() {
		modalContainer.classList.remove('is-visible');
	}

	//Closing modal by clicking on the Escape key
	window.addEventListener('keydown', (e) => {
		if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});

	// Closing modal by clicking on the target(modal div)
	modalContainer.addEventListener('click', (e) => {
		let target = e.target;
		if(target === modalContainer) {
			hideModal();
		}
	});

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
