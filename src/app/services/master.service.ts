import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from '../model/Country';
import { Constants } from '../common/Constants';
import { DrivingLicense } from '../model/DrivingLicense';
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  getCountries(){
    return this.http.get<Country[]>(Constants.UrlApis.GET_COUNTRIES,httpOptions)
  }

  getDrivingLicenses(){
    return this.http.get<DrivingLicense[]>(Constants.UrlApis.GET_DRIVING_LICENSES,httpOptions);
  }


}
