import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import * as service from '../../../api-service/service/index';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EmailPatternValidator } from '../../../api-service/all-validation-pattern/email-pattern-validator';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';
import { AadharPatternValidator } from '../../../api-service/all-validation-pattern/aadhar-pattern-validator';
import { PanPatternValidator } from '../../../api-service/all-validation-pattern/pan-pattern-validator';


declare const $: any;
declare var require: any;
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

 public add_record: FormGroup;
 public viewRecord;
 public submitted:boolean=false;
 public data;
 public his_superuser;
  regData: object;
  public processingFlag:boolean=false;


 constructor(
    private formBuilder: FormBuilder,
        private api: service.CallApiService,
        private authService: service.CommonAuthService,
        private tokenService: service.CanTokenSaveService,
        public toastr: ToastrManager,
        private _common: service.CommonService,
        private router: Router,
      ) {}
  ngOnInit() {
    
    this.his_superuser = '';
   this.createForm();
   
 }

  get f() { return this.add_record.controls; }

  private createForm() {
    this.add_record = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: new FormControl('', [Validators.required,EmailPatternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      mobile: new FormControl('', [Validators.required, MobilePatternValidator(/^(?=.*[0-9]).{10,10}$/)]),
      aadhar: new FormControl('', [Validators.required, AadharPatternValidator(/^(?=.*[0-9]).{12,12}$/)]),
      pan: new FormControl('', [Validators.required, PanPatternValidator(/^(?=.*[0-9]).{10,10}$/)]),
      designation: ['', Validators.required],
      is_superuser: ['', Validators.required],    
     });

  }


  
  public onSubmit() 
  {
   
    this.submitted = true;
    let data = this.add_record.value;
    if (this.add_record.invalid) {
        return;
      } else {
        
        this.regData = {
          "first_name": data.first_name,
          "last_name": data.last_name,
          "email": data.email,
          "phone_number": "+91"+data.mobile,
          "aadhar_number": data.aadhar,
          "pan_number": data.pan,
          "designation": data.designation,
          "is_superuser": data.is_superuser
         }
         this.processingFlag =true;
        this.api.post('/crm_user/', this.regData).subscribe(result=>{
         
          this.data = result;
          if(this.data.success){
            this.processingFlag =false;
            
           this.toastr.successToastr(this.data.message);
            this.router.navigate(['/manage-user/view-user']);
          }else{
            this.processingFlag =false;
            this.toastr.errorToastr(this.data.message);
          }

        },err=>{
          this.processingFlag =false;
          this.toastr.errorToastr(err.error.message, 'Error');
          if(err.error.data.email){
            this.toastr.errorToastr(err.error.data.email[0], 'Error');  
          }
          if(err.error.data.phone_number){
            this.toastr.errorToastr(err.error.data.phone_number[0], 'Error');  
          }
          if(err.error.data.aadhar_number){
            this.toastr.errorToastr(err.error.data.aadhar_number[0], 'Error');  
          }
          if(err.error.data.pan_number){
            this.toastr.errorToastr(err.error.data.pan_number[0], 'Error');  
          }
        });
       
     } 
  } 

  

  
 

}

    