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


import swal from 'sweetalert2';
declare const $: any;
declare var require: any;
@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls:['view-user.component.css']
})
export class ViewUserComponent implements OnInit {

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
         this.loadData();

       this.update_record = this.formBuilder.group({
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          email: new FormControl('', [Validators.required,EmailPatternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
          phone_number: new FormControl('', [Validators.required, MobilePatternValidator(/^(?=.*[0-9]).{10,10}$/)]),
          aadhar_number: new FormControl('', [Validators.required, AadharPatternValidator(/^(?=.*[0-9]).{12,12}$/)]),
          pan_number: new FormControl('', [Validators.required, PanPatternValidator(/^(?=.*[0-9]).{10,10}$/)]),
          designation: ['', Validators.required],
          is_superuser: ['', Validators.required],    
        });
    }

    get f() { return this.update_record.controls; }

    public loadData(){
      this.api.get('/crm_user/').subscribe(data=>{
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
        this.api.get('/crm_user/'+userid+'/').subscribe(data=>{
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
        this.api.get('/crm_user/'+userid+'/').subscribe(data=>{
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
                 "first_name": data.data.first_name,
                  "last_name": data.data.last_name,
                  "email": data.data.email,
                  "phone_number": number,
                  "aadhar_number": data.data.aadhar_number,
                  "pan_number": data.data.pan_number,
                  "designation": data.data.designation,
                  "is_superuser": data.data.is_superuser 
              }
               $('#loader').hide();
              $('#editRecordModal').modal('show');
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
              "first_name": data.first_name,
              "last_name": data.last_name,
              "email": data.email,
              "phone_number": "+91"+data.phone_number,
              "aadhar_number": data.aadhar_number,
              "pan_number": data.pan_number,
              "designation": data.designation,
              "is_superuser": data.is_superuser
             }
             this.processingFlag =true;
            this.api.put('/crm_user/'+this.pkid+'/', this.regData).subscribe(result=>{
             
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
   