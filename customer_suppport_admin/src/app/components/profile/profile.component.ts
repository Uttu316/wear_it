import { EventEmitter } from '@angular/core';
import { CallApiService } from './../../api-service/service/all-api-service/callapi.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { map, startWith } from 'rxjs/operators';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrManager, ToastrModule } from 'ng6-toastr-notifications';
import * as service from '../../api-service/service/index';
declare const $: any;
import { EmailPatternValidator } from '../../api-service/all-validation-pattern/email-pattern-validator';
import { PasswordPatternValidator } from '../../api-service/all-validation-pattern/password-pattern-validator';
import { UserIdPatternValidator } from '../../api-service/all-validation-pattern/userid-pattern-validator';
import { NamePatternValidator } from '../../api-service/all-validation-pattern/name-pattern-validator';
import { MobilePatternValidator } from '../../api-service/all-validation-pattern/mobile-pattern-validator';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 public update_profile: FormGroup;
public submitted:boolean=false;

public submittedw:boolean=false;
public profiledata ={};
public loginPassword: FormGroup;
public passwordData={};

public localstoragedata;

  constructor(private formBuilder: FormBuilder,
              private api: service.CallApiService,
              private tokenService: service.CanTokenSaveService,
              private router: Router,
              private toastr: ToastrManager,
              private tokenExpService: service.CanTokenRemoveService,
              public commonServe: service.CommonService

  ) {

  }
  ngOnInit() {
   
    this.createForm();
     this.localstoragedata = JSON.parse(localStorage.getItem('currentUser'));

     Object.keys(this.localstoragedata).forEach(item => {
         if (this.update_profile.contains(item)) {
                this.update_profile.controls[item].setValue(this.localstoragedata[item]);
            }
    });
    //this.loadApiData();
 }

  get f() { return this.update_profile.controls; }
  get formFieldLogin() {  return this.loginPassword.controls; }


  private createForm() {
    this.update_profile = this.formBuilder.group({
      name: ['', Validators.required],
      //last_name:['', Validators.required],
      email: new FormControl('', [Validators.required,EmailPatternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      phone_number: new FormControl('', [Validators.required, MobilePatternValidator(/^(?=.*[0-9]).{10,10}$/)]),
     // username:['', Validators.required]
    });

   this.loginPassword = this.formBuilder.group({
            newpassword: ['', Validators.required],
            confirmPassword: ['', Validators.required]
           
        });

  }
 private loadApiData() {
        this.api.get('/login/me').subscribe(data => {
            if (data[0].status === 'success') {
                this.profiledata['mededata'] = data[0].data;
                Object.keys(data[0].data).forEach(item => {
                     if (this.update_profile.contains(item)) {
                            this.update_profile.controls[item].setValue(this.profiledata['mededata'][item]);
                        }
                });
            }
        });
    }



  public onSubmit() {
    this.submitted = true;
   
    if (this.update_profile.invalid) {
     
        return;
      } else {
         this.api.post('/login/update_profile',this.update_profile.value).subscribe(data => {
            if (data.status === 'success') {
              this.toastr.successToastr(data.data, 'Success!'); 
            }else{
               this.toastr.errorToastr(data.data, 'Error!'); 
            }
        });
     
      } 

   } 

    onUpdatePassword() {
        if (this.loginPassword.valid) {
           
            this.passwordData['newpassword'] = this.loginPassword.value.newpassword;
            this.passwordData['confirmPassword'] = this.loginPassword.value.confirmPassword;
               
                if (this.passwordData['newpassword'] === this.passwordData['confirmPassword'])
                 {
                   this.api.post('/login/change_password',this.passwordData).subscribe(data => {
                      if (data.status === 'success') {
                        this.toastr.successToastr(data.data, 'Success!'); 
                      }else{
                         this.toastr.errorToastr(data.data, 'Error!'); 
                      }
                  }); 

                }  else {
                    this.toastr.errorToastr('New Password & Confirm Password Not Matched');
                }
        } else {
          this.submittedw = true;
        }
    }  

}

    