import { Component, OnInit } from '@angular/core';
import { Policy } from 'src/app/model/Policy';
import { FormBuilder, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Coverage } from 'src/app/model/Coverage';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CalculateInsured } from 'src/app/model/CalculateInsured';


@Component({
  selector: 'app-selection-coverage',
  templateUrl: './selection-coverage.component.html',
  styleUrls: ['./selection-coverage.component.css']
})
export class SelectionCoverageComponent implements OnInit {

  policy:Policy;
  coveringForm:any;
  vehicle:any;
  calculatePrice:CalculateInsured;
  coverages:Coverage[];


  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private datePipe: DatePipe,
    private vehicleService:VehicleService) { }

  ngOnInit(): void {
    this.policy={
      product:+localStorage.getItem("idProduct"),//CAMBIAR A ID PRODUCTO
      effectiveDate:"",
      frequency:0,
      modality:0,
      price:0
    }
    this.coveringForm=this.formBuilder.group({
      frequency:['',Validators.required],
      dateInsured:['',Validators.required],
      coverage:['',Validators.required]
    })
    this.getCovering();
   

  }

  format(date){
    const dateSendingToServer = this.datePipe.transform(date, 'dd-MM-yyyy')
    return dateSendingToServer
  }

  getCovering(){
    this.vehicleService.getCovering().subscribe(
      res=>{  
        this.coverages=res;
      },
      err=>{
        console.log(err);
      }
    )
  }

  onClickContinue(){
    
    if(this.coveringForm.valid){

    



        this.policy.effectiveDate=this.format(this.policy.effectiveDate)
        this.policy.frequency=+this.policy.frequency;
        this.policy.modality=+this.policy.modality;
        
  
  
        console.log(this.policy);
        localStorage.setItem("policy",JSON.stringify(this.policy))
  
        this.router.navigate(['fincontratacion']);
      
     
    }
    
  }

 

  onClickBack(){
    this.router.navigate(['altavehiculo']);
  }

}
