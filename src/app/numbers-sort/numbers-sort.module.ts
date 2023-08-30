import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumbersSortRoutingModule } from './numbers-sort-routing.module';
import { SorterComponent } from './sorter/sorter.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SorterComponent
  ],
  imports: [
    CommonModule,
    NumbersSortRoutingModule,
    SharedModule
  ]
})
export class NumbersSortModule { }
