import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanTokenSaveService } from './cantokensave.service';
import { CallApiService } from './callapi.service';

@Injectable()
export class CallAuthenticationService{
	constructor(
		private tokenSaveService: CanTokenSaveService,
		private callapi: CallApiService
	){}

	public isAuthenticate(): boolean{
		return (!!this.tokenSaveService.getAccessToken());
	}
}