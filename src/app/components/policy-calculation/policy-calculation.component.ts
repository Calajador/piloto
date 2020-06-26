import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CalculateInsured } from 'src/app/model/CalculateInsured';
import { PolicyService } from 'src/app/services/policy.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Policy } from 'src/app/model/Policy';
import { Vehicle } from 'src/app/model/Vehicle';
import { BankInvoicing } from 'src/app/model/BankInvoicing';
import { PolicyProcess } from 'src/app/model/PolicyProcess';

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
  periodicity:string;
  policyProcess:PolicyProcess;

  @Input('summary')
  summary: string;

  @Input('type')
  type: string;

  constructor(private router:Router,
    private spinner:NgxSpinnerService,
    private policyService:PolicyService) { }

  ngOnInit(): void {
    console.log(this.type);
    this.getCalculate();
    this.getPeriodicity();
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
          if(err.status==401){
            this.policyService.calculatePrice(this.calculatePolicy).subscribe(
              res=>{
                this.price=res.totalPrice
                this.policy.price=this.price;
                this.spinner.hide();
              },
              err=>{
                console.log(err)
              }
            )
          }
        }
      )

    }else{
     // alert("Error en el registro de la información del vehiculo, porfavor diligencie los datos nuevamente")
    }
  }

  getPeriodicity(){
    console.log(this.policy.modality);
    switch(this.policy.frequency){
      case 1:
        this.periodicity="Mensual";
      break;
      case 2:
        this.periodicity="Bimestral";
      break;
      case 3:
        this.periodicity="Trimestral";
      break;
      case 6:
        this.periodicity="Semestral";
      break;
      case 12:
        this.periodicity="Anual";
      break;

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

  onClickConfirm(){
    

    this.policyProcess={
      agent:+localStorage.getItem("id"),
      insured:+localStorage.getItem("insured"),
      payment:JSON.parse(localStorage.getItem("payment")),
      policy:JSON.parse(localStorage.getItem("policy")),
      policyHolder:+localStorage.getItem("policyholder"),
      vehicle:JSON.parse(localStorage.getItem("vehicle"))
    }

    this.spinner.show();
    this.policyService.generatePolicy(this.policyProcess).subscribe(
      res=>{
        console.log(res);
        if(this.type=='credit'){
          this.spinner.hide();
          this.router.navigate(['tarjeta',res.id])
        }else{
          this.spinner.hide();
          this.router.navigate(['finproceso','ko'])
        }
      },
      err=>{
        this.spinner.hide();
      }
    )   
  }


  onClickContinue(){
    localStorage.setItem("policy",JSON.stringify(this.policy));
    this.router.navigate(['cuenta']);
  }

  onClickBack(){
    this.router.navigate(['coberturas'])
  }

}
