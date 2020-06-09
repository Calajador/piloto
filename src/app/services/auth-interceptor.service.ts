import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ApiSecret } from '../common/API/ApiSecret';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { OAuthRequest } from '../common/API/OAuthRequest';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  secret:OAuthRequest;

  
  

  constructor(private auth:AuthService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): import("rxjs").Observable<HttpEvent<any>> {
    let request = req;

    this.secret={
      grant_type:ApiSecret.grant_type,
      client_id:ApiSecret.client_id,
      client_secret:ApiSecret.client_secret,
      scope:ApiSecret.scope
    }
    let token=localStorage.getItem("token");
    
    request= request.clone({headers:request.headers.set('X-Ibm-Client-Id',ApiSecret.client_id)})
    if(token){
      
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }


    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        //debugger;
        if (err.status === 401) {
          //this.getToken();
        }

        return throwError( err );

      })  
    );
    
  }

  
  

  async getToken(){  
    let token    
    
     (await this.auth.getToken(this.secret)).subscribe(
       resp=>{
        debugger;
        console.log(resp)
        token = resp.access_token;    
        localStorage.setItem("token",token); 
      },
      err=>{
        console.log(err);
      }
    );
    console.log(token);
    return token
  }


}
