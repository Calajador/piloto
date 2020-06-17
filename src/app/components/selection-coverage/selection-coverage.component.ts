import { Component, OnInit } from '@angular/core';
import { Policy } from 'src/app/model/Policy';
import { FormBuilder } from '@angular/forms';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Coverage } from 'src/app/model/Coverage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-coverage',
  templateUrl: './selection-coverage.component.html',
  styleUrls: ['./selection-coverage.component.css']
})
export class SelectionCoverageComponent implements OnInit {

  policy:Policy;
  coveringForm:any;
  coverages:Coverage[];
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private vehicleService:VehicleService) { }

  ngOnInit(): void {
    this.policy={
      product:0,
      effectiveDate:"",
      frequency:0,
      modality:0,
      price:0
    }
    this.coveringForm=this.formBuilder.group({

    })
    this.getCovering();
   

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
    debugger;
    this.router.navigate(['fincontratacion']);
  }

  onClickBack(){
    this.router.navigate(['altavehiculo']);
  }

}
