//pokemonList wrapped in IIFE

let pokemonRepository = (function () {

    let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Poison'] },
        { name: 'Charmander', height: 0.6, type: 'Fire' },
        { name: 'Squirtle', height: 0.5, type: 'Water' },
        { name: 'Caterpie', height: 0.3, type: 'Bug' }
    ];

    function add(pokemon) {
        if (
            typeof pokemon === "object"
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("Pokemon is not correct!")
        }
    }

    function getAll() {
        return pokemonList;
    }

    // create function & button for pokemonList
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };

})();


//forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
}
);



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
