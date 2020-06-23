import { Component, OnInit } from '@angular/core';
import { PolicyProcess } from 'src/app/model/PolicyProcess';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from 'src/app/services/policy.service';
import { BankInvoicing } from 'src/app/model/BankInvoicing';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  policy:PolicyProcess;
  type:string;

  constructor(private _route:ActivatedRoute,
    private policyService:PolicyService,
    private spinner: NgxSpinnerService,
    private router:Router) { }

  ngOnInit(): void {
    this.type=this._route.snapshot.paramMap.get('type');
  }

  onClickConfirm(){
    let bankInvoicing:BankInvoicing;
    this.policy={
      agent:localStorage.getItem("username"),
      insured:+localStorage.getItem("insured"),
      payment:JSON.parse(localStorage.getItem("payment")),
      policy:JSON.parse(localStorage.getItem("policy")),
      policyHolder:+localStorage.getItem("policyholder"),
      vehicle:JSON.parse(localStorage.getItem("vehicle"))
    }


    this.policyService.generatePolicy(this.policy).subscribe(
      res=>{
        console.log(res);
        if(this.type=='credit'){
          this.router.navigate(['tarjeta',res.id])
        }else{
          bankInvoicing={
            idBankInvoicing:res.id
          }
          this.spinner.show();
          this.policyService.bankInvoicing(bankInvoicing).subscribe(
            res=>{
              this.router.navigate(['finproceso'])
              this.spinner.hide();
            },
            err=>{
              this.spinner.hide();
            }
          )
         
        }
      },
      err=>{
        console.log(err);
      }
    )

   
  
  }



}
