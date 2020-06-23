import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalculateInsured } from 'src/app/model/CalculateInsured';
import { PolicyService } from 'src/app/services/policy.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Policy } from 'src/app/model/Policy';
import { Vehicle } from 'src/app/model/Vehicle';

@Component({
  selector: 'app-policy-calculation',
  templateUrl: './policy-calculation.component.html',
  styleUrls: ['./policy-calculation.component.css']
})
export class PolicyCalculationComponent implements OnInit {

  calculatePolicy:CalculateInsured;
  price:number;
  policy:Policy;
  dateEffect:string;

  constructor(private router:Router,
    private spinner:NgxSpinnerService,
    private policyService:PolicyService) { }

  ngOnInit(): void {
    this.getCalculate();
  }

  getCalculate(){
    
    let vehicle:Vehicle=this.getInfoVehicle();
    if(vehicle){
       this.policy=JSON.parse(localStorage.getItem("policy"));
      this.calculatePolicy={
        brand:vehicle.brand,
        cost:vehicle.price,
        model:vehicle.model,
        idVersion:vehicle.version,
        idPolicyHolder:+localStorage.getItem("policyholder"),    
        idInsured:+localStorage.getItem("insured"),
        version:vehicle.versionText,
        numberPlate:vehicle.plate,
        vehicleKilometers:vehicle.currentKms,
        expectedKilometers:vehicle.expectedKms,
        yearVehicle:vehicle.year,
        idModality:this.policy.modality,
        idProduct:+localStorage.getItem("idProduct"),//cambiar id producto
        paymentFrequency:this.policy.frequency


      }
      this.dateEffect=this.policy.effectiveDate;
      this.spinner.show();
      this.policyService.calculatePrice(this.calculatePolicy).subscribe(
        res=>{
          this.price=res.totalPrice
          this.policy.price=this.price;
          this.spinner.hide();
        },
        err=>{
          console.log(err);
          
        }
      )

    }else{
     // alert("Error en el registro de la información del vehiculo, porfavor diligencie los datos nuevamente")
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
    localStorage.setItem("policy",JSON.stringify(this.policy));
    this.router.navigate(['cuenta']);
  }

  onClickBack(){
    this.router.navigate(['coberturas'])
  }

}
