import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { CallAuthenticationService } from './callauthentication.service';

@Injectable()
export class CallCanactivechildService implements CanActivateChild {

	constructor(private authenticationService: CallAuthenticationService, private router: Router){}

	canActivateChild(): boolean {

		if(!this.authenticationService.isAuthenticate()){
			// this.router.navigateByUrl('/login');
			return false;
		}
		return true;
	}
}