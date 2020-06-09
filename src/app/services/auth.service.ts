import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http' 
import { User } from '../model/User';
import { Router } from '@angular/router';
import { Constants } from '../common/Constants';
import { Observable } from 'rxjs';
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router: Router) { }

  singIn(user:User){  
    localStorage.setItem("token","AAIkZjY3ZGViNGQtMWNhZi00NTM2LTkwM2YtYjMwYTU1NzQ0NGUwYVBtc2SEmlMI92jhE8KfuZa02-3s-zq2qnqhdBAwv9uGpWqaw_jqxohWSTe9GGuVgcHqfBYifDkJXHj8nzxYhOfUEvl5hbHAtWt8g8TTCeYgzG9GSKKfqAGp8a1ZhJNSuLJ39Cnrq3QQwh_YS7Kk3n1YuWEZZn7Va2hqXCBLq70");
    return this.http.post<any>(Constants.UrlApis.LOGIN,user,httpOptions);
   
  }

  isLogged():boolean{
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(apiSecret){

  
    const options={headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})}
    return this.http.post<any>(Constants.URL_OAUTH,apiSecret,options);

  }
}
