import {PokeTarjeta} from './PokeTarjeta.js';

window.onload = async() =>{
    await getPokemones(20,0);
}

var lospokemones = [];
var pokemones = [];

const getPokemones = async(l,o) =>{
    const url = 'https://pokeapi.co/api/v2/pokemon?limit='+l+'&offset='+o;
    const response = await fetch(url);
    if(response.ok){
        const data = await response.json();
        //console.log(data);
        pokemones = data.results;
        lospokemones = pokemones;
        verPokemones(lospokemones);
    }
}

const verPokemones = (pokemones) =>{
    document.querySelector('#info').innerHTML = '';
    pokemones.forEach(async (pok,i) => {
        const tarjeta = new PokeTarjeta(pok.name,pok.url,3);
        let card = await tarjeta.mostrar();
        document.querySelector('#info').innerHTML += card;
    });
}

const buscar = () =>{
    var input = document.querySelector('#buscar').value;
    let x = lospokemones.filter(pokemon => pokemon.name.includes(input));
    //console.log(x);
    verPokemones(x);
}

var boton = document.querySelector('#btnBuscar');
boton.addEventListener('click',buscar);






