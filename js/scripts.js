//pokemonList wrapped in IIFE

let pokemonRepository = (function () {

    let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Poison'] },
        { name: 'Charmander', height: 0.6, type: 'Fire' },
        { name: 'Squirtle', height: 0.5, type: 'Water' },
        { name: 'Caterpie', height: 0.3, type: 'Bug' }
    ];

        function add(pokemon) {
            pokemonList.push(pokemon);        
        }

        function getAll() {
            return pokemonList;
        }

        return {
            add: add,
            getAll: getAll
        };
    
    })();


//forEach loop
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write("<p>" + pokemon.name + " " + "(height: " + pokemon.height + ")</p>");  
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
