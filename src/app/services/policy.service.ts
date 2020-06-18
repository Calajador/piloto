import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalculateInsured } from '../model/CalculateInsured';
import { Constants } from '../common/Constants';
import { PolicyProcess } from '../model/PolicyProcess';
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http:HttpClient) { }

  calculatePrice(calculate:CalculateInsured){
    return this.http.post<any>(Constants.UrlApis.POST_CALCULATE_PRICE,calculate,httpOptions)
  }

  generatePolicy(policy:PolicyProcess){
    return this.http.post<any>(Constants.UrlApis.POST_GENERATE_POLICY,policy,httpOptions )
  }
}


