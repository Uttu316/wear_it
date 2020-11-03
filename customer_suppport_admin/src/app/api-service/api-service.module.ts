import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { EscapeHtmlPipe } from './service/pipes/keep-html.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ToastrModule.forRoot(),
       
    ],
    declarations: [
        EscapeHtmlPipe
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        EscapeHtmlPipe,
       
    ],
    providers: [
        
    ]
})
export class ApiServiceModule { }