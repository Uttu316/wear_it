import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as service from '../../api-service/service/index';
declare const $: any;
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'

})
export class NotFoundComponent implements OnInit {

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


}


}
