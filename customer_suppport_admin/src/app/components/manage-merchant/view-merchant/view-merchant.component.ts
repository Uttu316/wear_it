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


import swal from 'sweetalert2';
declare const $: any;
declare var require: any;
@Component({
    selector: 'app-view-merchant',
    templateUrl: './view-merchant.component.html',
    styleUrls:['view-merchant.component.css']
})
export class ViewMerchantComponent implements OnInit {

    public start = 0;
    public itemsTotal;
    public page: number = 1;
    public data:any;
    public dataa:any;
    public length:number = 50;
    public tabledata={};public flag:boolean=false;
    public tableview = {};
    public keys: any;
     p: number = 1;
     public singlerecord;

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

        this.localstoragedata = JSON.parse(localStorage.getItem('currentUser'));
         this.hcountry = '';
        this.hstate = '';
        this.hcity='';
        this.hmerchanttype = '';
        this.hcustomer_segment='';
         this.loadData();
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

    public loadData(){
      this.api.get('/new_merchant/').subscribe(data=>{
          this.tabledata['records'] = ''; 
          this.data = data;
          let rec = [];
            if(this.data.success){
              this.data = data.data;
              console.log(this.data);
              this.tabledata['tableData'] = data.data;
              //this.keys = Object.keys(this.data[0]);
              this.tableview['failmessage'] = '';
            }  
            else{
              this.data = '';
              this.tableview['failmessage'] = 'No Records Found';
            }
       });
    }

     public deleterecord(listid){
        swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
          if (result.value) {

            this.api.delete('/crm_user/'+listid+'/').subscribe(result => {
                this.loadData();
                if (result.success) 
                {    
                   this.toastr.successToastr(result.message, 'Success'); 
                } else
                {
                    this.toastr.errorToastr(result.message, 'Error');
                }
            }, error => {
                this.toastr.errorToastr(error.error.message, 'Error');

                
            });  
          
          }
        })
  }

    public viewRecord(userid){
       // var obj={ 'listid':userid }
       $('#loader').show();
        this.api.get('/new_merchant/'+userid+'/').subscribe(data=>{
         if(data.success){
              this.singlerecord = data.data;
               $('#loader').hide();
              $('#viewRecordModal').modal('show');
            }  
            else{
              this.singlerecord = '';
              this.tableview['failmessage'] = 'No Records Found';
            }
       });
    }

    public editrecord(userid){

        $('#loader').show();
        this.api.get('/new_merchant/'+userid+'/').subscribe(data=>{
         if(data.success){
              this.singlerecord = data.data;
              this.pkid = data.data.pk;
              if(data.data.his_superuser == 'true'){
                this.his_superuser = 'True';  
              }else{
                this.his_superuser = 'False';  

              }
              
              this.edit_phone = data.data.phone_number;
              var number = this.edit_phone.replace(/\D/g, '').slice(-10);
              var obj = {
                  "gstn": data.data.gstn,
                  "firm_name": data.data.firm_name,
                  "city": data.data.city,
                  "phone_number":number,
                  "state": data.data.state, 
                  "country": data.data.country,
                  "merchant_type": data.data.merchant_type,
                  "customer_segment": data.data.customer_segment,
                  "more_information": data.data.more_information,
                  "next_call_date": data.data.next_call_date
              }
               $('#loader').hide();
              $('#editRecordModal').modal('show');
               this.changeCountry(data.data.country);
               this.changeStateVal(data.data.state,data.data.country);
              // this.hstate = data.data.state;
              this.setDefaultDataInProfile(obj);
            }  
            else{
              this.singlerecord = '';
              this.tableview['failmessage'] = 'No Records Found';
            }
       });
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
               this.loadData();
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
   