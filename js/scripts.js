//pokemon array
let pokemonList = [
    {name:'Bulbasaur', height: 0.7, type:['Grass','Poison']}, 
    {name:'Charmander', height: 0.6, type:'Fire'}, 
    {name:'Squirtle', height: 0.5, type:'Water'},
    {name:'Caterpie', height: 0.3, type:'Bug'}
];

let pokemonLarge = "Wow, that's big!";

//loop pokemon name & height, conditional show large pokemon >= 0.7
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height >= 0.7) {
        document.write("<p>" + pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ") - " + (pokemonLarge) + "</p>");
    } else {
        document.write("<p>" + pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ")</p>")
    }
}

