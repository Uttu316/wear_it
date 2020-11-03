import { Injectable } from '@angular/core';
import { CanTokenSaveService } from './cantokensave.service';
import { Router } from '@angular/router';

@Injectable()
export class CanTokenRemoveService {
constructor(
private tokenSaveService: CanTokenSaveService,
private router: Router
) {}

	isTokenValid() {
		this.tokenSaveService.destroyAccessToken();
		// this.router.navigateByUrl('/login');
	}
	onJoinNow() {
		this.tokenSaveService.destroyAccessToken();
		// this.router.navigateByUrl('/register');
	}
}