import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemons-list/pokemon-list/pokemon-list.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { PokemonsListModule } from './pokemons-list/pokemons-list.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    ...canActivate(()=> redirectLoggedInTo(['/list']))
  },
  {
    path:'list',
    loadChildren: () => import('./pokemons-list/pokemons-list.module').then(m => m.PokemonsListModule),
    ...canActivate(()=> redirectUnauthorizedTo(['/']))
  },
  {
    path:'sort',
    loadChildren: () => import('./numbers-sort/numbers-sort.module').then(m => m.NumbersSortModule),
    ...canActivate(()=> redirectUnauthorizedTo(['/']))
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
