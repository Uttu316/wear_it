import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import * as service from '../../api-service/service/index';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EmailPatternValidator } from '../../api-service/all-validation-pattern/email-pattern-validator';
import { MobilePatternValidator } from '../../api-service/all-validation-pattern/mobile-pattern-validator';
import { AadharPatternValidator } from '../../api-service/all-validation-pattern/aadhar-pattern-validator';
import { PanPatternValidator } from '../../api-service/all-validation-pattern/pan-pattern-validator';
import { GstnPatternValidator } from '../../api-service/all-validation-pattern/gstn-pattern-validator';

declare const $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public dashboarddata = {};
  public redirecturl;
  public data;

  public start = 0;
  public itemsTotal;
  public page: number = 1;
  public dataa:any;
  public length:number = 50;
  public tabledata={};public flag:boolean=false;
  public tableview = {};
  public keys: any;
  p: number = 1;
  public singlerecord;
  public user_status;
  public update_record: FormGroup;
  public submitted:boolean=false;
  public his_superuser;
  regData: object;
  public pkid:any;
  public processingFlag:boolean=false;

  public edit_phone;
  public localstoragedata;

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

  public new_number;

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
    $('#loader').hide();

    this.localstoragedata = JSON.parse(localStorage.getItem('currentUser'));
    this.hcountry = '';
    this.hstate = '';
    this.hcity='';
    this.hmerchanttype = '';
    this.hcustomer_segment='';

    this.getCountry();
    this.getMerchantType();
    
    this.update_record = this.formBuilder.group({
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

 get f() { return this.update_record.controls; }

  public getCountry()
  {
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

  public changeStateVal(value,country){

   this.api.get('/city/'+country+'/'+value+'/').subscribe(result=>{
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

  public searchbyphone(val){
    $('#loader').show();
    this.api.get('/merchant_detail?phone_number='+val+'').subscribe(data=>{
          
          if(data.success)
          {
            $('#loader').hide();
            this.tableview['failmessage'] = '';
            this.singlerecord = data.data.user_info;
            this.user_status = data.data.user_status;
            this.pkid = data.data.user_info.pk;
             
             this.edit_phone = data.data.user_info.phone_number;
             
             this.new_number = this.edit_phone.replace(/\D/g, '').slice(-10);
          
          }else{
             $('#loader').hide();
              this.singlerecord = '';
              this.tableview['failmessage'] = data.message;
            }
       },err=>{
          $('#loader').hide();
          this.singlerecord = '';
         this.tableview['failmessage'] = err.error.message;
         });
  }

  public viewImage(){
    $('#product_view').modal('show');
  }

  public editMerchant(){
    $('#editRecordModal').modal('show');
     this.changeCountry(this.singlerecord.country);
     this.changeStateVal(this.singlerecord.state,this.singlerecord.country);
     var obj = {
            "gstn": this.singlerecord.gstn,
            "firm_name": this.singlerecord.firm_name,
            "city": this.singlerecord.city,
            "phone_number":this.new_number,
            "state": this.singlerecord.state, 
            "country": this.singlerecord.country,
            "merchant_type": this.singlerecord.merchant_type,
            "customer_segment": this.singlerecord.customer_segment,
            "more_information": this.singlerecord.more_information,
            "next_call_date": this.singlerecord.next_call_date
        }
     this.setDefaultDataInProfile(obj);
  }

  public setDefaultDataInProfile(event) {
      Object.keys(event).forEach(field1 => {
        Object.keys(this.update_record.controls).forEach(field => {
         
          if (field.toLowerCase() === field1.toLowerCase()) {
           
            this.update_record.get(field).setValue(event[field1]);
           
          }
        });
      });
  }

  public onUpdate(){
        this.submitted = true;
        let data = this.update_record.value;
        if (this.update_record.invalid) {
            return;
          } else {
            
            this.regData = {
                 "gstn": data.gstn,
                  "firm_name": data.firm_name,
                  "city": data.city,
                  "phone_number":"+91"+data.phone_number,
                  "state": data.state, 
                  "country": data.country,
                  "merchant_type": data.merchant_type,
                  "customer_segment": data.customer_segment,
                  "more_information": data.more_information,
                  "next_call_date": data.next_call_date
             }
             this.processingFlag =true;
            this.api.put('/new_merchant/'+this.pkid+'/', this.regData).subscribe(result=>{
             
              this.data = result;
              if(this.data.success){
                this.processingFlag =false;
                
               this.toastr.successToastr(this.data.message);
               $('#editRecordModal').modal('hide');
              
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
