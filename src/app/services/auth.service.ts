import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http' 
import { User } from '../model/User';
import { Router } from '@angular/router';
import { Constants } from '../common/Constants';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiSecret } from '../common/API/ApiSecret';
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<string>;
  public currentUser:Observable<string>;

  constructor(private http:HttpClient,private router: Router) {
    this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('username'))
    this.currentUser=this.currentUserSubject.asObservable();
   }

  singIn(user:User){   
    //localStorage.setItem("token","AAIkZjY3ZGViNGQtMWNhZi00NTM2LTkwM2YtYjMwYTU1NzQ0NGUwRqjfDhkbSWuFCb7u8jKKsUrJ6j_knYXAlK2ZM7kM7tASdXtKAbJHkG81eeiXFe8jqfN0Q-mNBk7ej3Qy9RHfg_WvtEd7QoC7WRMG3KCY2AJRHnZeoyxksgpVE67tTxNWoe06tYegubTc_mkQEBJRTPAtSUwYkOlDiXr3JBN9OBI");
    this.currentUserSubject.next(user.userName);
    return this.http.post<any>(Constants.UrlApis.LOGIN,user,httpOptions);
   
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
}

  isLogged():boolean{
    var session=localStorage.getItem('username');
    if(session!=""){
      return true;
    }else{
      return false;
    }
  }

  logout() {
    localStorage.removeItem('username');
    this.currentUserSubject.next(null);
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
