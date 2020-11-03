import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { CallApiService } from '../../service/all-api-service/callapi.service';
import { CanTokenRemoveService } from '../../service/all-api-service/cantokenremove.service';

@Injectable()

export class CommonService {
 public selectcity;

  constructor(
    private callapi: CallApiService,
    private http: HttpClient,
    private tokenRemove: CanTokenRemoveService) {}


 
    
  
  
}
