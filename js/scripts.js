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
        
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");

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
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();

        }).then(function (details) {
            //add details to item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(item) {
    pokemonRepository.loadDetails(item).then(function () {
      let modalTitle = document.querySelector(".modal-title");
      modalTitle.innerText = item.name;

      let pokemonHeight = document.querySelector(".height");
      pokemonHeight.innerText = "Height: " + item.height;

      let modal = document.querySelector(".modal");
      modal.classList.add("is-visible");

      let modalHeader= document.querySelector('.modal-title');

      let modalCloseButton = document.createElement("button");
      modalCloseButton.classList.add("button-class");
      modalCloseButton.classList.add('modal-close');

      modalHeader.append(modalCloseButton);
      modalCloseButton.innerText= 'x';

      modalCloseButton.addEventListener("click", function () {
        closeModal();
      });
    });

    function closeModal() {
      let modal = document.querySelector(".modal");
      modal.classList.remove("modal-is-visible");
      modal.classList.add('modal');
    }
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
