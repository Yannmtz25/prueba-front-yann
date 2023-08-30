import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { PokeInfo, Type } from '../models/pokemon-model.interface';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit{

  public panelOpenState = false;
  public pokeInfo: PokeInfo | null = null;
  

  @Input() apiUrl:string="";
  @Input() pokeDataSearch:PokeInfo | null = null;


  constructor(
    private pokeService:PokemonService
  ){ }
  
  
  ngOnInit(): void {
    if(this.pokeDataSearch!==null){
      this.pokeInfo=this.pokeDataSearch;
      this.pokeInfo.types.forEach(ind =>{
        ind.type.url=this.getTypeImgs(ind);
      });
      this.pokeInfo.version_group.name= this.getGamesNames(this.pokeInfo.version_group.name);
    }
    else{
      this.getPokeInfo();
    }
    
  }

  public getPokeInfo(){
    this.pokeService.getPokeById(this.apiUrl).pipe(
      take(1),
      map((value:PokeInfo)=>{
        value.types.forEach(ind => {
          ind.type.url=this.getTypeImgs(ind);
        })
        value.version_group.name=this.getGamesNames(value.version_group.name);
        return value;
      })
    ).subscribe(response =>{
      this.pokeInfo=response;
    });
  }

  
  public getTypeImgs(ind:Type):string{
    switch (ind.type.name) {
      case "flying":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/volador.gif";
        break;

      case "normal":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/normal.gif";
        break;
    
      case "fighting":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/lucha.gif";
        break;
    
      case "poison":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/veneno.gif";
        break;
    
      case "ground":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/tierra.gif";
        break;
    
      case "rock":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/roca.gif";
        break;
    
      case "bug":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/bicho.gif";
        break;
    
      case "ghost":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/fantasma.gif";
        break;
    
      case "steel":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/acero.gif";
        break;
    
      case "fire":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/fuego.gif";
        break;
    
      case "water":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/agua.gif";
        break;
    
      case "grass":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/planta.gif";
        break;
    
      case "electric":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/electrico.gif";
        break;
    
      case "psychic":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/psiquico.gif";
        break;
    
      case "ice":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/hielo.gif";
        break;
    
      case "dragon":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/dragon.gif";
        break;
    
      case "dark":
        return  "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/siniestro.gif";
        break;
    
      case "fairy":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/hada.gif";
        break;
    
      case "shadow":
        return "http://www.pkparaiso.com/imagenes/xy/sprites/tipos/sombra.gif";
        break;
    
      default:
        return "";
        break;
    }
  }

  public getGamesNames(gameName:string):string{
    switch (gameName) {
      case "red-blue":
          return "Pokémon Rojo y Pokémon Azul";
        break;

      case "yellow":
          return "Pokémon Amarillo";
        break;

      case "gold-silver":
          return "Pokémon Oro y Pokémon Plata";
        break;

      case "crystal":
          return "Pokémon Cristal";
        break;

      case "ruby-sapphire":
          return "Pokémon Rubí y Pokémon Zafíro";
        break;

      case "emerald":
          return "Pokémon Esmeralda";
        break;

      case "firered-leafgreen":
          return "Pokémon Rojo Fuego y Pokémon Verde Hoja";
        break;

      case "diamond-pearl":
          return "Pokémon Diamante y Pokémon Perla";
        break;

      case "platinum":
          return "Pokémon Platino";
        break;

      case "heartgold-soulsilver":
          return "Pokémon Heartgold y Pokémon Soulsilver";
        break;

      case "black-white":
          return "Pokémon Negro y Pokémon Blanco";
        break;

      case "colosseum":
          return "Pokémon Colosseum";
        break;

      case "xd":
          return "Pokémon XD";
        break;

      case "black-2-white-2":
          return "Pokémon Negro 2 y Pokémon Blanco 2";
        break;

      case "x-y":
          return "Pokémon X y Pokémon Y";
        break;

      case "omega-ruby-alpha-sapphire":
          return "Pokémon Omega Rubí y Pokémon Alfa Zafíro";
        break;

      case "sun-moon":
          return "Pokémon Sol y Pokémon Luna";
        break;

      case "ultra-sun-ultra-moon":
          return "Pokémon Ultrasol y Pokémon Ultraluna";
        break;

      case "lets-go-pikachu-lets-go-eevee":
          return "Pokémon Let's go, Pikachu! y Pokémon Let's go, Eevee!";
        break;

      case "sword-shield":
          return "Pokémon Espada y Pokémon Escudo";
        break;

      case "the-isle-of-armor":
          return "La isla de la Armadura";
        break;

      case "the-crown-tundra":
          return "Las nieves de la Corona";
        break;

      case "brilliant-diamond-and-shining-pearl":
          return "Pokémon Diamante Brillante y Pokémon Perla Reluciente";
        break;

      case "legends-arceus":
          return "Leyendas Pokémon: Arceus";
        break;

      case "scarlet-violet":
          return "Pokémon Escarlata y Pokémon Púrpura";
        break;

      case "the-teal-mask":
          return "La Máscara Turquesa";
        break;

      case "the-indigo-disk":
          return "El Disco Índigo";
        break;

      default:
        return "";
        break;
    }
  }

}

