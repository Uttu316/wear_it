import {NgModule} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {SigninComponent} from './signin/signin.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './registeration/registeration.component';
import {AuthenticationComponent} from './authentication.component';
import { ApiServiceModule } from '../../api-service/api-service.module';

// import { ParticlesModule } from 'angular-particle';


export const AuthenticationRoutes: Routes = [
    {
      path: '',
      component: AuthenticationComponent,
      children: [
         
         {
            path: 'login',
            component: SigninComponent
         },
         {
          path: 'register',
          component: RegisterComponent
         },
        
         {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
        }
        ]
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule, ApiServiceModule,
    ReactiveFormsModule,
  ],
  declarations: [ SigninComponent, AuthenticationComponent, RegisterComponent,HomeComponent]
})
export class AuthenticationModule { }
