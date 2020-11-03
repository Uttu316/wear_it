import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './components/authentication/authentication.module';

import { NotFoundModule } from './components/not-found/not-found.module';
import { SomethingWrongModule } from './components/something-wrong/something-wrong.module';
// import { ProductsService } from './products.service';
import { DataTablesModule } from 'angular-datatables';


// import { AdminLoginComponent } from './components/admin-login/admin-login.component';

import { ApiServiceModule } from './api-service/api-service.module';
import { CallAuthenticationService } from './api-service/service/all-api-service/callauthentication.service';
import { CallCanactivechildService } from './api-service/service/all-api-service/callcanactivechild.service';
import * as service from './api-service/service/index';
import { environment } from '../environments/environment';
import { LockerModule, Locker, DRIVERS} from 'angular-safeguard';
import { ServiceWorkerModule } from '@angular/service-worker';

const lockerConfig = {
  driverNamespace: 'evencoinuser',
  driverFallback: [DRIVERS.LOCAL, DRIVERS.SESSION, DRIVERS.COOKIE],
  namespaceSeperator: '-'
};
@NgModule({
  declarations: [
    AppComponent,
   NavbarComponent,
   SidebarComponent,
   // AdminLoginComponent
   
  ],
  imports: [
   BrowserAnimationsModule,
    BrowserModule,
    ApiServiceModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthenticationModule,
    NotFoundModule,
    SomethingWrongModule,
    DataTablesModule,
    LockerModule.withConfig(lockerConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],

  providers: [
    
        service.CallApiService,
       service.CommonAuthService,
       service.CommonService,
       service.CanTokenRemoveService,
       service.CanTokenSaveService,
       CallAuthenticationService,
       CallCanactivechildService,
       

     { provide: LocationStrategy, useClass: HashLocationStrategy }],
    
    bootstrap: [AppComponent]
})
export class AppModule { }
