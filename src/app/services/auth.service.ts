import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http' 
import { User } from '../model/User';
import { Router } from '@angular/router';
import { Constants } from '../common/Constants';
import { Observable } from 'rxjs';
import { ApiSecret } from '../common/API/ApiSecret';
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router: Router) { }

  singIn(user:User){   
    //localStorage.setItem("token","AAIkZjY3ZGViNGQtMWNhZi00NTM2LTkwM2YtYjMwYTU1NzQ0NGUwRqjfDhkbSWuFCb7u8jKKsUrJ6j_knYXAlK2ZM7kM7tASdXtKAbJHkG81eeiXFe8jqfN0Q-mNBk7ej3Qy9RHfg_WvtEd7QoC7WRMG3KCY2AJRHnZeoyxksgpVE67tTxNWoe06tYegubTc_mkQEBJRTPAtSUwYkOlDiXr3JBN9OBI");
    return this.http.post<any>(Constants.UrlApis.LOGIN,user,httpOptions);
   
  }

  isLogged():boolean{
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(apiSecret):Observable<any>{


    const body = new HttpParams()
    .set('grant_type', apiSecret.grant_type)
    .set('client_secret', apiSecret.client_secret)
    .set('scope', apiSecret.scope)
    .set('client_id', apiSecret.client_id);
  
    const options={headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})}
    return this.http.post<any>(Constants.URL_OAUTH,body,options);

  }
}
