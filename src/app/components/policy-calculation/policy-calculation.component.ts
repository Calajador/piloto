import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalculateInsured } from 'src/app/model/CalculateInsured';
import { PolicyService } from 'src/app/services/policy.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-policy-calculation',
  templateUrl: './policy-calculation.component.html',
  styleUrls: ['./policy-calculation.component.css']
})
export class PolicyCalculationComponent implements OnInit {

  calculatePolicy:CalculateInsured;
  price:number;
  dateEffect:string;

  constructor(private router:Router,
    private spinner:NgxSpinnerService,
    private policyService:PolicyService) { }

  ngOnInit(): void {
    this.getCalculate();
  }

  getCalculate(){
    
    let vehicle=this.getInfoVehicle();
    if(vehicle){
      let policy=JSON.parse(localStorage.getItem("policy"));
      this.calculatePolicy={
        brand:vehicle.brand,
        cost:vehicle.price,
        model:vehicle.model,
        version:vehicle.versionText,
        numberPlate:vehicle.plate,
        vehicleKilometers:vehicle.currentKms,
        expectedKilometers:vehicle.expectedKms,
        yearVehicle:vehicle.year,
        idModality:policy.modality,
        idProduct:2,
        paymentFrequency:policy.frequency


      }
      this.dateEffect=policy.effectiveDate;
      this.spinner.show();
      this.policyService.calculatePrice(this.calculatePolicy).subscribe(
        res=>{
          this.price=res.totalPrice
          this.spinner.hide();
        },
        err=>{
          console.log(err);
          
        }
      )

    }else{
      alert("Error en el registro de la información del vehiculo, porfavor diligencie los datos nuevamente")
    }
  }



  getInfoVehicle():any{
    let vehicle=JSON.parse(localStorage.getItem("vehicle"))
     if(vehicle){      
       return vehicle;
     }else{
     
       return null;
     }
   }

  onClickContinue(){
    this.router.navigate(['cuenta']);
  }

  onClickBack(){
    this.router.navigate(['coberturas'])
  }

}
