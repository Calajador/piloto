import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Brand } from 'src/app/model/Brand';
import { FormBuilder, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/model/Vehicle';
import { VehicleModel } from 'src/app/model/VehicleModel';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { VersionVehicle } from 'src/app/model/VersionVehicle';

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css']
})
export class VehicleManagementComponent implements OnInit {

  vehicle:Vehicle;
  versionModel:number;
  modelText:string;
  submitted:boolean;
  brandText:string;
  versionText:string;
  version:VersionVehicle[];
  modelSelected:number;
  brands:Brand[];

  vehicleModels:VehicleModel[];
  vehicleForm:any;
  brandSelected:number;

  constructor(private vehicleService:VehicleService,
    private router:Router,
    private _location: Location,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    let plateRegex = '^([aA-zZ]{2}[0-9]{3}[aA-zZ]{2})|([aA-zZ]{1}[0-9]{3}[aA-zZ]{3})$';
    this.submitted=false;
    this.vehicle={
      year:2020,
      currentKms:0,
      expectedKms:0,
      plate:"",
      price:0,
      version:0
    }

    this.vehicleForm=this.formBuilder.group({
      car_registration_vr:['',[Validators.required,Validators.pattern(plateRegex),Validators.minLength(6),Validators.maxLength(8)]],
      cost_vr:['',[Validators.required,Validators.min(1)]],
      current_km_vr:['',[Validators.required,Validators.min(1)]],
      provied_km_vr:['',[Validators.required,Validators.min(1)]],
      year_vr:['',Validators.required],
      mark_vr:['',Validators.required],
      model_vr:['',Validators.required],
      version_vr:['',[Validators.required]]
    })

  
    this.brands=[];
    this.brandSelected=0;
    this.versionModel=0;
    this.modelSelected=0;

    this.getBrands();
    
    this.setValueLocal();
  }

  get f() { return this.vehicleForm.controls;}
  

  getBrands(){
    this.vehicleService.getBrands().subscribe(
      data=>{
        this.brands=data;
      },
      err=>{
        console.log(err);
      }
    )
  }

  onChangeBrand(event,brandId){    
    this.getModels(this.brandSelected)
    this.setSelectedBrandText(brandId)
  }

  getModels(id){
    this.vehicleService.getModels(id).subscribe(
      res=>{
        this.vehicleModels=res;
      },
      err=>{
        console.log("no cargo los modelos de vehiculos")
      }
    )
  }

  public setSelectedBrandText(value: number): void {
    
    if (this.brands) {
       let status: Brand = this.brands.find(s => s.id == value);
       if (status)
         this.brandText = status.brand;
         console.log(this.brandText);
    }
     else
        this.brandText = '';
  }

  public setSelectedModelText(value: number): void {

    if (this.vehicleModels) {
       let status: VehicleModel = this.vehicleModels.find(s => s.id == value);
       if (status)
         this.modelText = status.model;
     }
     else
        this.modelText = '';
  }

  public setSelectedVersionText(value: number): void {

    if (this.version) {
       let status: VersionVehicle = this.version.find(s => s.id == value);
       if (status)
         this.versionText = status.version;
     }
     else
        this.versionText = '';
  }

  onChangeModel(event,modelId){
    this.getVersion(this.modelSelected,this.brandSelected)
    this.setSelectedModelText(modelId);
  }

  onChangeVersion(event,versionId){
    this.setSelectedVersionText(versionId);
  }

  getVersion(idModel:number,idBrand:number){
    this.vehicleService.getVersion(idModel,idBrand).subscribe(
      res=>{
        this.version=res;
      },
      err=>{
        console.log(err);
      }
    )
  }


  setValueLocal(){
    
    let vehicle:Vehicle=JSON.parse(localStorage.getItem("vehicle"));
    if(vehicle){
      this.vehicle=vehicle;
      this.brandSelected=this.vehicle.idBrand;
      this.onChangeBrand(null,this.brandSelected);
      this.modelSelected=this.vehicle.idModel;
      this.onChangeModel(null,this.modelSelected)
      this.versionModel=this.vehicle.version;
    }
  }

  

  onClickContinue(){
    this.submitted=true;  
    console.log(this.vehicleForm);
    
    if(this.vehicleForm.valid){      
      this.vehicle.brand=this.brandText;
      this.vehicle.model=this.modelText;
      this.vehicle.idBrand=+this.vehicleForm.controls.mark_vr.value;
      this.vehicle.idModel=+this.vehicleForm.controls.model_vr.value;
      this.vehicle.versionText=this.versionText;
      this.vehicle.version=+this.versionModel;
      localStorage.setItem("vehicle",JSON.stringify(this.vehicle));
      this.router.navigate(['coberturas']);
    }
  }

  onClickBack(){
    this._location.back();
  }

}
