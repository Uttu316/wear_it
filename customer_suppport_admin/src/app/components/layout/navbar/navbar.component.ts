import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as service from '../../../api-service/service/index';


declare const $: any;
import Swal from 'sweetalert2';


import { Location } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   public dashboard = {};
  public data;
  public flag:boolean=false;
  public profileimage;
  public security_flag;
  constructor(location: Location,
    private api: service.CallApiService,
    private authService: service.CommonAuthService,

    private tokenExpService: service.CanTokenRemoveService,
    private tokenService: service.CanTokenSaveService,
    public common: service.CommonService,
    public router: Router) {}
    
    ngOnInit() 
    {
       $('body').removeClass('custom-bg');


      this.getProfileImg();
      this.api.get('/secure/me').subscribe(data => {
        // this.dashboard['userdata'] = data.data;
        // this.common.commonMemberid = this.dashboard['userdata'].memberid;
        // console.log(data)
        // this.common.allsecuremedata = this.dashboard['userdata'];
        }, err => {
          this.tokenExpService.isTokenValid();
        });

     
  }

  public getProfileImg(){
   //  this.api.get('/secure/getprofileimg').subscribe(data=>{
   //    if(data.status == 1){
   //      this.profileimage = data.data;
   //      this.common.commonPrifilePic = this.profileimage;
       
   //    }else if(data.status == 0)
   //    {
   //     this.profileimage = "assets/images/avatars/default-avatar.jpg";
   //    }else{
   //      this.profileimage = "assets/images/avatars/default-avatar.jpg";
   //    }
   // }, err=>{
   //   this.profileimage = "assets/images/avatars/default-avatar.jpg";
   // })
 } 

public onLogout() 
{
  this.authService.onLogout();
}

}
