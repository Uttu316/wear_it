import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CanTokenSaveService } from './cantokensave.service';
import { map, catchError, filter } from 'rxjs/operators';

@Injectable()
export class CallApiService {

  authCheck: any;

  constructor(private http: HttpClient,
              private tokenSaveService: CanTokenSaveService) {}

   private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json'
    };

    if (this.tokenSaveService.getAccessToken() ) {

    headersConfig['Authorization'] = `token ${this.tokenSaveService.getAccessToken()}`;
    //headersConfig['Access-Sign'] = `${this.tokenSaveService.getAccessSign()}`;
    }
    return new HttpHeaders(headersConfig);
  }


  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), params: params })
    .pipe(
      map((res: Response) => res),
      catchError(this.Httperror)
      );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`,JSON.stringify(body),{ headers: this.setHeaders() }).pipe(
      map((res: Response) => res),
      catchError(this.Httperror)
      );
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, { headers: this.setHeaders(), params: params })
    .pipe(
      map((res: Response) => res),
      catchError(this.Httperror)
      );
  }
 
 put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .pipe(
      map((res: Response) => res),
      catchError(this.Httperror)
      );
  }
  //  public _deleteCall(url: string, body?: {}, params?: any): Observable<any> {
  //    console.log(url);
  //   const httpOptions = {
  //     body: body,
  //     params: params,
  //     headers: this.setHeaders()
  //   };
  //   return this.http.request('delete', `${environment.api_url}${url}`, httpOptions).pipe(
  //     map((res: Response) => {
  //       console.log(res);
  //        res;
  //     }),
  //     catchError(this.Httperror)
  //   );
  // }

  private Httperror(error: any) {
    return throwError(error);
  }
}
