import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import * as service from '../../../api-service/service/index';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EmailPatternValidator } from '../../../api-service/all-validation-pattern/email-pattern-validator';


declare const $: any;
declare var require: any;

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
  })
export class SigninComponent implements OnInit {

	public signin: FormGroup;
	public submitted: boolean = false;
	public errmsg: boolean = false; 
	public flag:boolean=true;
	
	public otpValidation:any;
	public otpflag=false;
	
	public loginCredentials;

	public user = "";
	public pass= "";
	public remme = false;

	public loadingFlag:boolean=false;
	
	constructor(
		private formBuilder: FormBuilder,
				private api: service.CallApiService,
				private authService: service.CommonAuthService,
				private tokenService: service.CanTokenSaveService,
				public toastr: ToastrManager,
				private _common: service.CommonService,
				private router: Router,
			) {}

ngOnInit()
{
	


	if(this.tokenService.getAccessToken()){this.router.navigate(['/dashboard']);}
	
	this.signin = this.formBuilder.group({
		  	email: new FormControl('', [Validators.required,EmailPatternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
        	password: ['', Validators.required],
		});

		if("user" in localStorage && "pass" in localStorage){
	  		this.remme = true;
	  		this.user = localStorage.getItem("user");
	  		this.pass = localStorage.getItem("pass");
	  	}
	}

get formControlErrors() {
		return this.signin.controls;
}

onLogin() 
{ 
		let data = this.signin.value;
		if (this.signin.valid) 
		{
			this.loadingFlag = true;
			this.loginCredentials = {
	            "email": data.email,
				"password": data.password
				// "deviceid":'localhost1'
			}
			this.submitted = false;
			
			this.api.post('/login/', this.loginCredentials).subscribe(result => {
				
				if (result.success) 
				{	
					this.loadingFlag = false;
					this.tokenService.saveAccessToken(result.data.token);
					localStorage.setItem('currentUser', JSON.stringify(result.data));
					this.router.navigate(['/dashboard']);
				} else
				{
					this.loadingFlag = false;
					this.toastr.errorToastr(result.message, 'Error');
				}
			}, error => {
				this.loadingFlag = false;
				//console.log(error.error.message);
				this.toastr.errorToastr(error.error.message, 'Error');

				
			});
		} else {
			this.submitted = true;
		}
}


	
}

