import { Component, OnInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { PasswordMatchPattern } from '../../../api-service/all-validation-pattern/password-match-pattern';
import { EmailPatternValidator } from '../../../api-service/all-validation-pattern/email-pattern-validator';
import { PasswordPatternValidator } from '../../../api-service/all-validation-pattern/password-pattern-validator';
import { UserIdPatternValidator } from '../../../api-service/all-validation-pattern/userid-pattern-validator';
import { NamePatternValidator } from '../../../api-service/all-validation-pattern/name-pattern-validator';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';
import * as service from '../../../api-service/service/index';
// import { ToastrManager } from 'ng6-toastr-notifications';
// import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

declare const $: any;
declare var require: any;


// const cc = require('./countries.json');
declare interface ValidatorFn {
    (c: AbstractControl): {
        [key: string]: any;
    };
}

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {


    constructor(private formBuilder: FormBuilder,
                private http: HttpClient,
                private apiService: service.CallApiService,
                private router: Router,
                private tokenService: service.CanTokenSaveService,
                private texpiry: service.CanTokenRemoveService,
                private activatedRoute: ActivatedRoute,
              
                public _commonService: service.CommonService,
                vcr: ViewContainerRef
        ) {  }
    ngOnInit() {
       $('#loader').hide();   
  }
}
