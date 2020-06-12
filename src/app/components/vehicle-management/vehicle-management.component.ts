import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Brand } from 'src/app/model/Brand';
import { FormBuilder, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/model/Vehicle';
import { VehicleModel } from 'src/app/model/VehicleModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css']
})
export class VehicleManagementComponent implements OnInit {

  vehicle:Vehicle;
  versionModel:number;
  modelSelected:number;
  brands:Brand[];
  vehicleModels:VehicleModel[];
  vehicleForm:any;
  brandSelected:number;

  constructor(private vehicleService:VehicleService,
    private router:Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.vehicle={
      year:2020,
      currentKms:0,
      expectedKms:0,
      plate:"",
      price:0,
      version:0
    }

    this.vehicleForm=this.formBuilder.group({
      car_registration_vr:['',Validators.required],
      cost_vr:['',Validators.required],
      current_km_vr:['',Validators.required],
      provied_km_vr:['',Validators.required],
      year_vr:['',Validators.required],
      mark_vr:['',Validators.required],
      model_vr:['',Validators.required],
      version_vr:['',Validators.required]
    })

  
    this.brands=[];
    this.brandSelected=0;
    this.versionModel=0;
    this.modelSelected=0;
    this.getBrands();
  }

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

  onChangeBrand(event){
    this.getModels(this.brandSelected)
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

  onClickContinue(){
    if(this.vehicleForm.valid){
      localStorage.setItem("vehicle",JSON.stringify(this.vehicle));
      this.router.navigate(['coberturas']);
    }
  }

  onClickBack(){

  }

}
