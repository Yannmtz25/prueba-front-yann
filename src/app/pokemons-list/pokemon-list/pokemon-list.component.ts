import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { PokeData, PokeInfo } from 'src/app/shared/models/pokemon-model.interface';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit{
  
  public pokeData: PokeData | null = null;
  public pokeCount: any;
  public pokeUnique: PokeInfo | null=null;
  public pageIndex:number = 0;
  public count:number | null=0;
  public value:string="";

  public searchForm: FormGroup;

  durationInSeconds = 5*1000;
  

  constructor(
    private pokeService:PokemonService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    ){
      this.searchForm = this.formBuilder.group({
        pokeName: [
          '',
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }
    handlePageEvent(e: PageEvent) {
      this.pageEvent = e;
      this.pageIndex = e.pageIndex;
      this.getPokeList();
    }
    
    pageEvent: PageEvent | undefined;
    
    
    
    ngOnInit(): void {
      this.getPokeCount();
      this.getPokeList();
    }

  openSnackBar(err:string) {
    this._snackBar.open(err,'',{duration:this.durationInSeconds});
  }

  public getPokeCount(){
    this.pokeService.getPokeTotal().subscribe(response =>{
      this.pokeCount=response;
      this.count=this.pokeCount.count;
    })
  }
  public getPokeList(back:boolean=false){
    if(back){
      this.pageIndex=0;
    }
    this.pokeService.getPokeList(this.pageIndex+1).subscribe(response =>{
      this.pokeData=response;
      this.pokeUnique=null;
      
    })
  }
  public onSubmit(){
    const pokeName = this.searchForm.get('pokeName')?.value;
  }

  public getPoke(){
    this.pokeUnique=null;
    const pokeName = this.searchForm.get('pokeName')?.value.toLowerCase();
    
      this.pokeService.getPokeByName(pokeName).subscribe({
        next:(result:PokeInfo) =>{
          this.pokeData=null;
          this.pokeUnique=result;
        }, error:(error) => {
          if(error.error="Not Found"){
            this.openSnackBar("Pokémon no encontrado");
          }
        }
      });
    
      
    
  }
  

}
