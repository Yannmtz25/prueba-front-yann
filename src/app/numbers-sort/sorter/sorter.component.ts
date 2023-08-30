import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface PeriodicElement {
  position: number;
  numRepeated: string;
  reps: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
];

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent {
  
  public sortForm: FormGroup;
  public numString: string="";
  public numArrayString: string[]=[]
  public numArray: number[]=[];
  public numCount: number[][]=[];
  public itExist:boolean=false;
  public indExist:number=-1;
  public toPush = new Array();
  public inputPattern = '^[0-9]+(,[0-9]+)*$'
  
  displayedColumns: string[] = ['position', 'numRepeated', 'reps'];
  dataSource = ELEMENT_DATA;

  numsToPush: PeriodicElement[] | null = [];

  constructor(
    private formBuilder: FormBuilder
  ){
    this.sortForm = this.formBuilder.group({
      nums:[
        '',
        Validators.required,
      ]
    });

  }
  
  
  public getNums(){
    this.numString=this.sortForm.get('nums')?.value;
    this.splitNums();
    this.countNums();
    this.getDataTable();
    this.numCount=[];
  }

  public splitNums(){
    this.numArrayString=this.numString.split(',');
    this.numArrayString.forEach(element =>{
      this.numArray.push(Number(element));
    })
    this.numArrayString=[];
  }


  public countNums(){
    for (var i = 0; i < this.numArray.length; i++) {
      for (var j = 0; j < this.numCount.length; j++) {
        if(this.numArray[i]===this.numCount[j][0]){
          this.itExist=true;
          this.indExist=j;
        }
      }
      if(this.itExist===true && this.indExist!== -1){
        console.log("5");
        this.numCount[this.indExist][1] += 1;
        this.itExist=false;
        this.indExist=-1;
      }else{
        this.toPush[0] = this.numArray[i];
        this.toPush[1] = 1;
        this.numCount.push(this.toPush);
        this.toPush=[];
      }
    }
    this.numArray=[];

    this.numCount.sort((a:any,b:any) => b[0] - a[0]);
    
    this.getOutputString();
    // console.log(this.numCount);
  }

  public getOutputString(){
    this.numString ="";
    for(var i=0; i<this.numCount.length; i++){
      if(i===this.numCount.length-1){
        this.numString =this.numString + this.numCount[i][0] + "-" + this.numCount[i][1];
      }else{
        this.numString =this.numString + this.numCount[i][0] + "-" + this.numCount[i][1]+",";
      }
    }    
  }
  

  public getDataTable(){
    this.numsToPush=[];
    for(var i=0; i<this.numCount.length; i++){
      this.numsToPush.push({'position':i,'numRepeated':this.numCount[i][0].toString(),'reps':this.numCount[i][1]});
    }
    console.log(this.numCount);
    console.log(this.numsToPush);
    this.dataSource=this.numsToPush;
  }
}