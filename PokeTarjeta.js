







export class PokeTarjeta{
    nombre='';
    url = '';
    col = '';
    constructor(n,u,c){
        this.nombre = n;
        this.url = u;
        this.col = c;
    }
    async mostrar(){
        let poke = await getPoke(this.url);
        let img = poke[0];
        let altura = poke[1]/10;
        let peso = poke[2]/10;
        let id = poke[3];
        let tipos = poke[4];
        let habilidades = poke[5];
        let tip ='';
        let habs = '';
        tipos.forEach(ele => {
            tip += ele.type.name+' ';
        });
        habilidades.forEach(ele => {
            habs += ele.ability.name+' ';
        });
        let tarjeta = '<div class="col-md-'+this.col+' mt-3">';
        tarjeta +='<div class="card p-3">';
        tarjeta +='<img src="'+img+'" height="120" class="card-img-top" alt="...">'
        tarjeta +='<div class="card-body">'
        tarjeta +='<h5 class="card-title text-capitalize text-center"><span class="badge text-bg-warning">'+id+'</span> '+this.nombre+'</h5>'
        tarjeta +='<p class="card-text">Altura: <b>'+altura+' mts</b> Peso: <b>'+peso+' kg</b></p>'
        tarjeta +='<p>Habilidades: <b>'+habs+'</b> </p>'
        tarjeta +='<p>Tipo: <b>'+tip+'</b> </p>'
        tarjeta +='</div></div>';
        tarjeta += '</div>';
        return tarjeta;
    }
}
const getPoke = async(liga) =>{
    const peticion = await fetch(liga);
    if(peticion.ok){
        const data = await peticion.json();
        const altura = data.height;
        const peso = data.weight;
        const id = data.id;
        const tipos = data.types;
        const habilidades = data.abilities;
        const img = data.sprites.other.dream_world.front_default;
        return [img,altura,peso,id,tipos,habilidades];
    }
}