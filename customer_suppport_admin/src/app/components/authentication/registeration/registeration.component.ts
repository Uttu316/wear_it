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
import { ToastrManager } from 'ng6-toastr-notifications';
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
  selector: 'app-register',
  styleUrls: ['./registeration.component.css'],
  templateUrl: './registeration.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
 
  public register: FormGroup;
  public submitted = false;
  public regData: any;
  public correctdata = {};
  public flag: boolean = false;
 
  constructor(private formBuilder: FormBuilder,
                private http: HttpClient,
                private apiService: service.CallApiService,
                private router: Router,
                private tokenService: service.CanTokenSaveService,
                private texpiry: service.CanTokenRemoveService,
                private activatedRoute: ActivatedRoute,
               private toastr: ToastrManager,
                public _commonService: service.CommonService,
                vcr: ViewContainerRef
        ) {  if(this.tokenService.getAccessToken()){
            window.sessionStorage.removeItem('New-UserToken');
            window.sessionStorage.removeItem('New-UserSign');
          }  }
   ngOnInit()
    {
       //$('#registerSuccessPopup').modal('show');
    
    this.regData = {};
    this.register = this.formBuilder.group({
        email: new FormControl('', [Validators.required,EmailPatternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
        name: new FormControl('', [Validators.required, NamePatternValidator(/^[-_a-zA-Z]+(\s+[-_a-zA-Z]+)*$/)]),
        mobile: new FormControl('', [Validators.required, MobilePatternValidator(/^(?=.*[0-9]).{8,12}$/)]),
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
       
    }, {
       validator: PasswordMatchPattern('password', 'confirmPassword')
    });
  }
  get f() { return this.register.controls; }
  
  onRegister() {
    this.submitted = true;
    let data = this.register.value;
  
      if (this.register.invalid ) {
        return;
      } else
      {

          $('#loader').show();
          this.regData = {    
              'email': data.email,
              'fname': data.name,
              'password': data.password,
              'mobile': data.mobile.toString(),
          }
            this.apiService.post('/users/registration', this.regData).subscribe(result => {
                if (result.status === 'success')
                 {
                    this.flag = true;
                    $('#loader').hide();
                   $('#registerSuccessPopup').modal('show');
                } else {
                  $('#loader').hide();
                console.log(result.data);
                    this.toastr.errorToastr(result.data, 'Error!');
                }
            }, error => {
                $('#loader').hide();
                this.toastr.errorToastr('Internal Earror', 'Error!');
              });
          }
      }
    

  public loginRedirect()
  {
    $('#registerSuccessPopup').modal('hide');
    this.router.navigate(['/login']);
  }


 
}




