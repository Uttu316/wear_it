import {NgModule} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NotFoundComponent} from './not-found.component';
export const NotFoundRoutes: Routes = [
    {
      path: '',
      component: NotFoundComponent
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(NotFoundRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
