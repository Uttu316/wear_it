import {NgModule} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SomethingWrongComponent} from './something-wrong.component';
import { PreviousRouteService } from './previous-route.service';
export const SomethingWrongRoutes: Routes = [
    {
      path: '',
      component: SomethingWrongComponent
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SomethingWrongRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
   providers: [
     PreviousRouteService,

    ],
  declarations: [SomethingWrongComponent]
})
export class SomethingWrongModule { }
