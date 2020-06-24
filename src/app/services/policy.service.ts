import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalculateInsured } from '../model/CalculateInsured';
import { Constants } from '../common/Constants';
import { PolicyProcess } from '../model/PolicyProcess';
import { CreditCard } from '../model/CreditCard';
import { BankInvoicing } from '../model/BankInvoicing';
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

  payCreditCard(credit:CreditCard){
    return this.http.post<any>(Constants.UrlApis.POST_PAY_POLICY,credit,httpOptions)
  }

  bankInvoicing(bankInvoicing:BankInvoicing){
    return this.http.post<any>(Constants.UrlApis.POST_BANK_INVOICING,bankInvoicing,httpOptions)
  }
}


