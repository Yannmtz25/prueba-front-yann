import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { PokeData, PokeInfo } from '../models/pokemon-model.interface';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) {}


  public getPokeList(numPag:number){
    return this.http.get<PokeData>(`${environment.urlApi}pokemon-form?offset=${(numPag-1)*20}&limit=20/`);
  }


  public getPokeById(urlPoke:string){
    return this.http.get<PokeInfo>(`${urlPoke}`);
  }


  public getPokeTotal(){
    return this.http.get(`${environment.urlApi}pokemon-form/`);
  }


  public getPokeByName(pokeName:string){
    return this.http.get<PokeInfo>(`${environment.urlApi}pokemon-form/${pokeName}`);
  }

}
