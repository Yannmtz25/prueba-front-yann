import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SorterComponent } from './sorter/sorter.component';

const routes: Routes = [
  {
    path:'',
    component: SorterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NumbersSortRoutingModule { }
