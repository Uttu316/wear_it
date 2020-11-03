import { Injectable } from '@angular/core';


@Injectable()
export class CanTokenSaveService {

  getAccessToken(): string {
    return window.localStorage['Authorization'];
  }
  
  // getAccessSign(): string {
  //   return  window.localStorage['Access-Sign'];
  // }

  saveAccessToken(accesstoken: string) {
    window.localStorage['Authorization'] = accesstoken;
   
  }

  destroyAccessToken() {
    window.localStorage.removeItem('Authorization');
    
  }

  

}
