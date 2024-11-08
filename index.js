let limit = 20;
let offset = 0;

const siguiente = async() =>{
    offset += 20;
    await getPokemones(limit,offset);
}

let btnNext = document.querySelector('#next');
btnNext.addEventListener('click',siguiente);

window.onload = async() =>{
    await getPokemones(limit,offset);
}

const getPokemones = async(l,o) =>{
    const url = 'https://pokeapi.co/api/v2/pokemon?limit='+l+'&offset='+o;
    let tabla = '';
    const response = await fetch(url);
    if(response.ok){
        const data = await response.json();
        //console.log(data);
        let pokemones = data.results;
        pokemones.forEach(async (pok,i) => {
            let img = await getImagen(pok.url);
            tabla += '<tr><td>'+(i+1)+'</td><td>'+pok.name+
            '</td><td><img height="80" src="'+img+'" /></td></tr>';
            document.querySelector('#info').innerHTML = tabla;
        });
    }
}

const getImagen = async(liga) =>{
    const peticion = await fetch(liga);
    if(peticion.ok){
        const data = await peticion.json();
        return data.sprites.other.dream_world.front_default;
    }
}