//pokemonList wrapped in IIFE
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        //check if pokemon is object & has a name
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("Pokemon is not correct!")
        }
    }

    function getAll() {
        return pokemonList;
    }

    // function for addListItem & button
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");

        let button = document.createElement("button");
        button.innerText = (pokemon.name);
        button.classList.add("btn");
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        button.addEventListener('click', function () {
            showDetails(pokemon)
        });
    }

    // add loadList promise fetch function
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    // add loadDetails promise fetch function
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();

        }).then(function (details) {
            //add details to item
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon)
        });
    }


    function showModal(pokemon) {
        //after bootstrap

        let modalTitle = document.querySelector(".modal-title");
        modalTitle.innerText = pokemon.name;

        let pokemonImage = document.querySelector(".pokemon-image");
        pokemonImage.setAttribute('src', pokemon.imageUrl);

        let pokemonHeight = document.querySelector(".pokemon-height");
        pokemonHeight.innerText = "Height: " + (pokemon.height/10) + "m";


    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    };

})();


pokemonRepository.loadList().then(function () {
    //forEach loop
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon)
    });
});
