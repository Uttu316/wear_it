import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallCanactivechildService } from './api-service/service/all-api-service/callcanactivechild.service';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
// import { AdminLoginComponent } from './components/admin-login/admin-login.component';
const routes: Routes = [

   {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
  },
  {
      path: '',
      component: SidebarComponent,
      canActivateChild: [CallCanactivechildService],
      children: 
      [
        { 
          path: '', loadChildren: () => import('./modules/innerpage.module').then(m => m.InnerPageModule) 
        },
 
      ]
  },
  { 
    path: '', loadChildren: () => import('./components/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
   path: 'not-found', loadChildren: () => import('./components/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
   path: 'something-wrong', loadChildren: () => import('./components/something-wrong/something-wrong.module').then(m => m.SomethingWrongModule)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
