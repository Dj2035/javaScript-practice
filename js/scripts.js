// IIFE
let pokemonRepository = (function() {
  // Initialize pokemon list
  let pokemonList = [];

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let input = $("input");
  input.on("input", filterList);

  //Defining getAll function to return pokemonList
  function getAll() {
    return pokemonList;
  }

  // adding the typeof function (Needs to be checked)
  function add(pokemon) {
    if (pokemon.name && pokemon.detailsUrl) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function addListItem(pokemon) {
    // select List & create list item
    let ul = document.querySelector("ul");
    let listItem = document.createElement("li");
    listItem.classList.add("col-sm-6", "col-md-4", "col-lg-3");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.addEventListener("click", event => {
      showDetails(pokemon);
      event.target.blur();
    });
    //Add classes & attributes to list item
    button.classList.add("btn", "btn-block");
    button.classList.add("m-1", "text-capitalize", "pokemon-button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", ".modal");

    // Add item to list
    listItem.appendChild(button);
    ul.appendChild(listItem);
  }

  function loadingMessageHidden(hide) {
    let loadingMessage = document.querySelector(".loading-message");
    if (hide) {
      loadingMessage.classList.add("hidden");
    } else {
      loadingMessage.classList.remove("hidden");
    }
  }

  // Function for showing pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function loadList() {
    loadingMessageHidden(false);
    return fetch(apiUrl)
      .then(response => {
        loadingMessageHidden(true);
        return response.json();
      })
      .then(json => {
        json.results.forEach(item => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(err => {
        loadingMessageHidden(true);
        console.error(err);
      });
  }

  function loadDetails(item) {
    loadingMessageHidden(false);
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        loadingMessageHidden(true);
        return response.json();
      })
      .then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.svgUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.weight = details.weight;
        let types = [];
        details.types.forEach(item => types.push(item.type.name));
        item.types = types;
      })
      .catch(function(err) {
        loadingMessageHidden(true);
        console.error(err);
      });
  }

  function filterList() {
    let inputValue = $("input").val();
    let list = $("li");
    list.each(function() {
      let item = $(this);
      let name = item.text();
      if (name.startsWith(inputValue)) {
        item.show();
      } else {
        item.hide();
      }
    });
  }

  function showModal(pokemon) {
    //Assigning modal variables
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

    // Clear all existing modal content
    modalTitle.empty();
    modalBody.empty();

    // Creating pokemon elements
    let pokemonName = $(`<h1>${pokemon.name}</h1>`);
    let pokemonImage = $(
      `<img class="modal-img mx-auto" src="${pokemon.svgUrl}" alt="Image of ${pokemon.name}">`
    );

    let pokemonHeight = $(
      `<p class="ml-4 mt-3 mb-0">Height: ${pokemon.height}</p>`
    );
    let pokemonWeight = $(`<p class="ml-4 mb-0">Weight: ${pokemon.weight}</p>`);
    let pokemonTypes = $(
      `<p class="ml-4">Types: ${pokemon.types.join(", ")}</p>`
    );

    // appending pokemon elements to the modal div
    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypes);
  }

  // Returning getAll add, add functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

//loading data from pokemon url
pokemonRepository.loadList().then(function() {
  // forEach loop using function that allows to retrieve the pokemon list
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
