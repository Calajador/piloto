import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/model/Vehicle';
import { VersionVehicle } from 'src/app/model/VersionVehicle';
import { VehicleModel } from 'src/app/model/VehicleModel';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-summary-vehicle',
  templateUrl: './summary-vehicle.component.html',
  styleUrls: ['./summary-vehicle.component.css']
})
export class SummaryVehicleComponent implements OnInit {

  vehicle:Vehicle;
  versionModel:number;
  vehicleForm:any;
 
  

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.vehicle={
      year:2020,
      currentKms:0,
      expectedKms:0,
      plate:"",      
      price:0,
      version:0
    }

    this.setValueVehicle();

    this.vehicleForm=this.formBuilder.group({
      car_registration_v:['',Validators.required],
      cost_v:[this.vehicle.price,Validators.required],
      current_km_v:[this.vehicle.currentKms,Validators.required],
      provied_km_v:[this.vehicle.expectedKms,Validators.required],
      year_v:[this.vehicle.year,Validators.required],
      mark_v:[this.vehicle.brand,Validators.required],
      model_v:[this.vehicle.model,Validators.required],
      version_v:[this.vehicle.versionText,Validators.required]
    })

  }

  setValueVehicle(){
    var tmp = localStorage.getItem("vehicle");
    if(tmp){
      this.vehicle=JSON.parse(tmp);

    }
  }

}
