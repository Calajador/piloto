import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { Payment } from 'src/app/model/Payment';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-account-additional',
  templateUrl: './account-additional.component.html',
  styleUrls: ['./account-additional.component.css']
})
export class AccountAdditionalComponent implements OnInit {

  switchAccount:boolean;
  account:number;
  accountForm:any;
  payment:Payment;

  constructor(private router:Router,
    private formBuilder:FormBuilder,
    private _location: Location) { }

  ngOnInit(): void {

    this.account=0;
    this.payment={
      account:"",
      firstPayCreditCard:"false",
      type:"DOMICILIACION_BANCARIA"
    }
    this.accountForm=this.formBuilder.group(
      {
        number_account: ['', [Validators.required]],
      }
    )
   
    this.switchAccount=false;
  }

  onChangeAccount(event){
    this.switchAccount=!this.switchAccount;
  }

  onClickContinue(){
  

    if(this.account!=0){    
      this.payment.account=this.account.toString();
      if(this.switchAccount){
        this.payment.firstPayCreditCard="true"; 
      }else{
        this.payment.firstPayCreditCard="false";
      }         
      localStorage.setItem("payment",JSON.stringify(this.payment));
      if(this.switchAccount){ 
        
        this.router.navigate(['resumen/credit']) 
        
        //this.router.navigate(['tarjeta'])
      }else{
        this.router.navigate(['resumen/nocredit'])    
        //this.router.navigate(['finproceso'])
      }
    }       
  }

  onClickBack(){
    this._location.back();
  }

}
