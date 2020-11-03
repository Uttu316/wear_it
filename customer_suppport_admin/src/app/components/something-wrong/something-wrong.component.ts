import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as service from '../../api-service/service/index';
declare const $: any;
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { PreviousRouteService } from './previous-route.service';
@Component({
  selector: 'app-something-wrong',
  templateUrl: './something-wrong.component.html',
  styleUrls: ['./something-wrong.component.css']

})
export class SomethingWrongComponent implements OnInit {

  constructor(location: Location,
    private api: service.CallApiService,
    private authService: service.CommonAuthService,
    private tokenExpService: service.CanTokenRemoveService,
    private tokenService: service.CanTokenSaveService,
    public common: service.CommonService,
    public router: Router,
    private previousRouteService: PreviousRouteService) {}

ngOnInit()
{
	  $('body').removeClass('custom-bg');
   console.log(this.previousRouteService.getPreviousUrl());

}

public changeUrl(){
 
  if(this.previousRouteService.getPreviousUrl() === '/something-wrong')
  {
      this.router.navigateByUrl('/dashboard');
  }else{
    this.router.navigateByUrl(this.previousRouteService.getPreviousUrl());
  }
}

}
