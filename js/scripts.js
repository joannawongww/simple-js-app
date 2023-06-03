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
        button.innerText = pokemon.name;
        button.classList.add("btn-primary");

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        // event listener click and console log pokemon
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
            console.log(pokemon.name)
        });
    }


    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add("modal");

        let modalCloseButton = document.createElement("button");
        modalCloseButton.classList.add('btn-dark');
        modalCloseButton.innerText = 'x';

        let modalTitle = document.createElement('h1');
        modalTitle.classList.add('modal-title');
        modalTitle.innerText = (pokemon.name);

        let pokemonHeight = document.createElement('p');
        pokemonHeight.classList.add('modal-content');
        pokemonHeight.innerText = "Height: " + (pokemon.height);

        modal.appendChild(modalCloseButton);
        modal.appendChild(modalTitle);
        modal.appendChild(pokemonHeight);
        modalContainer.appendChild(modal);

        if (pokemon.imageUrl) {
            let imagePokemon = document.createElement('img');
            imagePokemon.setAttribute('src', pokemon.imageUrl);
            imagePokemon.setAttribute('height', '230');
            imagePokemon.setAttribute('width', '300');
            imagePokemon.setAttribute('alt', "Pokemon Image");

            modal.appendChild(imagePokemon);
        }

        modalContainer.classList.add('is-visible');

        modalCloseButton.addEventListener("click", hideModal);

        window.addEventListener('keydown', (e) => {
            let modalContainer = document.querySelector('#modal-container');
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
        });

        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });

    }

    
    function hideModal() {
        let modalContainer = document.querySelector("#modal-container");
        modalContainer.classList.remove('is-visible');
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



// let pokemonLarge = "Wow, that's big!";

// for loop pokemon name & height, conditional show large pokemon >= 0.7
// function printArrayDetails(pokemonList) {
// for (let i = 0; i < pokemonList.length; i++) {
//     if (pokemonList[i].height >= 0.7) {
//         document.write("<p>" + pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ") - " + (pokemonLarge) + "</p>");
//     } else {
//         document.write("<p>" + pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ")</p>")
//     }
// }
// }

//print array
// printArrayDetails(pokemonList);
