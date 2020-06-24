import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../common/Constants';
import { Brand } from '../model/Brand';
import { VehicleModel } from '../model/VehicleModel';
import { Coverage } from '../model/Coverage';
import { VersionVehicle } from '../model/VersionVehicle';
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http:HttpClient) { }

  getBrands(){
    return this.http.get<Brand[]>(Constants.UrlApis.GET_VEHICLE_BRANDS,httpOptions);
  }

  getModels(id:number){
    let url=Constants.UrlApis.GET_MODEL_BRANDS.replace(":id",id.toString());
    return this.http.get<VehicleModel[]>(url,httpOptions);
  }

  getCovering(){
    let id=1;
    let url=Constants.UrlApis.GET_COVERING+id;
    return this.http.get<Coverage[]>(url,httpOptions);
  }

  getVersion(idModel:number,idBrand:number){
    let url=Constants.UrlApis.GET_VEHICLE_VERSION.replace(":idBrand",idBrand.toString()); 
    url=url.replace(":idModel",idModel.toString());
    return this.http.get<VersionVehicle[]>(url,httpOptions);
  }

  

}
