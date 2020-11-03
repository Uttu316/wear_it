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
import { GstnPatternValidator } from '../../../api-service/all-validation-pattern/gstn-pattern-validator';


declare const $: any;
declare var require: any;
@Component({
  selector: 'app-add-merchant',
  templateUrl: './add-merchant.component.html',
  styleUrls: ['./add-merchant.component.css']
})
export class AddMerchantComponent implements OnInit {

 public add_record: FormGroup;
 public viewRecord;
 public submitted:boolean=false;
 public data;
 public his_superuser;
  regData: object;
  public processingFlag:boolean=false;
  
  public countryRecord;
  public hcountry;
  public countryselectvalue;

  public stateRecord;
  public hstate;
  public stateflag:boolean=false;

  public cityRecord;
  public hcity;
  public cityflag:boolean=false;

  public merchanttype;
  public hmerchanttype;

  public customer_segment;
  public hcustomer_segment;

  public localstoragedata:any;

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
    
    this.hcountry = '';
    this.hstate = '';
    this.hcity='';
    this.hmerchanttype = '';
    this.hcustomer_segment='';

    this.createForm();
    this.getCountry();
    this.getMerchantType();

    this.localstoragedata = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(this.localstoragedata.is_superuser);
}

  get f() { return this.add_record.controls; }

  private createForm() {
    this.add_record = this.formBuilder.group({
      firm_name: ['', Validators.required],
      phone_number: new FormControl('', [Validators.required, MobilePatternValidator(/^(?=.*[0-9]).{10,10}$/)]),
      gstn: new FormControl('', [Validators.required, GstnPatternValidator(/^(?=.*[0-9]).{15,15}$/)]),
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      merchant_type: ['', Validators.required], 
      customer_segment: ['', Validators.required], 
      more_information: ['' ], 
      next_call_date: [''],      
     });

  }

public getCountry(){
    this.api.get('/country/').subscribe(result=>{
      this.data = result;
      if(this.data.success)
      {
       this.countryRecord = this.data.data['country-list'];
       
      }

    },err=>{
      this.toastr.errorToastr(err.error.message, 'Error');
      
    });
}

public changeCountry(value){
    this.countryselectvalue = value;
   this.api.get('/state/'+value+'/').subscribe(result=>{
      this.data = result;
      if(this.data.success)
      {
       this.stateRecord = this.data.data['state-list'];
       this.stateflag = true;
       
      }

    },err=>{
      this.toastr.errorToastr(err.error.message, 'Error');
      
    });
}

public changeState(value){

   this.api.get('/city/'+this.countryselectvalue+'/'+value+'/').subscribe(result=>{
      this.data = result;
      if(this.data.success)
      {
       this.cityRecord = this.data.data['city-list'];
       this.cityflag = true;
       
      }

    },err=>{
      this.toastr.errorToastr(err.error.message, 'Error');
      
    });
}

public getMerchantType(){
    this.api.get('/list_of_merchants/').subscribe(result=>{
      this.data = result;
      if(this.data.success)
      {
       this.merchanttype = this.data.data;
       this.customer_segment = this.data.data;
       
      }

    },err=>{
      this.toastr.errorToastr(err.error.message, 'Error');
      
    });
}

  public onSubmit() 
  {
   
    this.submitted = true;
    let data = this.add_record.value;
    if (this.add_record.invalid) {
        return;
        
      } else {

        // if(this.localstoragedata.is_superuser == 'True'){
        //     var next_call_date =data.next_call_date;
        // }else{
        //     var next_call_date =data.next_call_date;
        // }
         
        this.regData = {
          "gstn": data.gstn,
          "firm_name": data.firm_name,
          "city": data.city,
          "phone_number": "+91"+data.phone_number,
          "state": data.state,
          "country": data.country,
          "merchant_type": data.merchant_type,
          "customer_segment": data.customer_segment,
          "more_information": data.more_information,
          "next_call_date": data.next_call_date
         }
         this.processingFlag =true;
        
        this.api.post('/new_merchant/', this.regData).subscribe(result=>{
         
          this.data = result;
          if(this.data.success){
            this.processingFlag =false;
            
           this.toastr.successToastr(this.data.message);
            this.router.navigate(['/manage-merchant/view-merchant']);
          }else{
            this.processingFlag =false;
            this.toastr.errorToastr(this.data.message);
          }

        },err=>{
          this.processingFlag =false;
          this.toastr.errorToastr(err.error.message, 'Error');
          if(err.error.data.phone_number){
            this.toastr.errorToastr(err.error.data.phone_number[0], 'Error');  
          }
          if(err.error.data.gstn){
            this.toastr.errorToastr(err.error.data.gstn[0], 'Error');  
          }
          // if(err.error.data.state){
          //   this.toastr.errorToastr(err.error.data.aadhar_number[0], 'Error');  
          // }
          // if(err.error.data.pan_number){
          //   this.toastr.errorToastr(err.error.data.pan_number[0], 'Error');  
          // }
        });
       
     } 
  } 

  

  
 

}

    