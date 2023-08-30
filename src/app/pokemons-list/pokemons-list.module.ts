import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { SharedModule } from '../shared/shared.module';
import { PokemonListRoutingModule } from './pokemons-list-routing.module';



@NgModule({
  declarations: [
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    PokemonListRoutingModule,
    SharedModule,
  ]
})
export class PokemonsListModule { 

}
