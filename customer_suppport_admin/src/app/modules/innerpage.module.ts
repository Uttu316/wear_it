import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiServiceModule } from '../api-service/api-service.module';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ProfileComponent } from '../components/profile/profile.component';
 import {DatePipe} from '@angular/common';



import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MyDatePickerModule } from 'mydatepicker';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipeModule } from 'ngx-filter-pipe'; 

import { AddUserComponent, ViewUserComponent } from '../components/manage-user';

import { AddMerchantComponent, ViewMerchantComponent } from '../components/manage-merchant';

export const ComponentRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
     {
        path: 'profile',
        component: ProfileComponent
    },{
        path: 'manage-user',
        children: [
            {
                path: 'add-user',
                component: AddUserComponent
            },{
                path: 'view-user',
                component: ViewUserComponent
            }
        ]
    },{
        path: 'manage-merchant',
        children: [
            {
                path: 'add-merchant',
                component: AddMerchantComponent
            },{
                path: 'view-merchant',
                component: ViewMerchantComponent
            }
        ]
    }
  
];

@NgModule({
    imports: [
        CommonModule,
        ApiServiceModule,
        AutocompleteLibModule,
        AngularEditorModule,
        MyDatePickerModule ,
        FilterPipeModule,
        NgxPaginationModule,Ng2SearchPipeModule,
       RouterModule.forChild(ComponentRoutes)
    ],
    declarations: [
        DashboardComponent,
        ProfileComponent,
        AddUserComponent,
        ViewUserComponent,
        AddMerchantComponent,
        ViewMerchantComponent
       
        

      
        
    ],
    providers: [
    DatePipe
  ],
})
export class InnerPageModule {}

