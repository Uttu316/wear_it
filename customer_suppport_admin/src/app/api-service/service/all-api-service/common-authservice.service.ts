import { Router } from '@angular/router';
import { CallApiService } from './callapi.service';
import { CanTokenSaveService } from './cantokensave.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonAuthService {

    constructor( private apiService: CallApiService,
        private tokenSaveService: CanTokenSaveService,
        private route: Router,
        
    ) {}

   onLogin(user) {
     // return this.apiService.post('/login', user);
   }

	onLogout() {
		
		this.tokenSaveService.destroyAccessToken();
		localStorage.clear();
		 this.route.navigate(['/login']);
	}
}
