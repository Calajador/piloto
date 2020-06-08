import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../common/Constants';
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProducts(){
    let user=localStorage.getItem("username");
    return this.http.get<any>(Constants.UrlApis.GET_PRODUCTS+user,httpOptions);
    
  }
}
