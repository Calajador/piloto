import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common'
import { FormBuilder, Validators } from '@angular/forms';
import { CreditCard } from 'src/app/model/CreditCard';
import { PolicyService } from 'src/app/services/policy.service';
import { BankInvoicing } from 'src/app/model/BankInvoicing';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  visa:boolean;
  mastercard:boolean;
  american:boolean;
  card:string;
  name:string;
  cvv:string;
  month:string;
  year:string;
  typeCard:string;
  formCredit:any;
  id:number;
  submitted:boolean;
  

  constructor(private router:Router,
    private _route:ActivatedRoute,
    private policyService:PolicyService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder:FormBuilder,
    private location:Location) { }

  ngOnInit(): void {
    this.id=+this._route.snapshot.paramMap.get('id');

    let regexNumber="^[0-9]+$"

    this.formCredit=this.formBuilder.group({
      cardHolder:['',[Validators.required]],
      numcard:['',[Validators.required,Validators.pattern(regexNumber)]],
      yearcard:['',Validators.required],
      cvv_card:['',[Validators.required,Validators.maxLength(4),Validators.minLength(3)]],  
      monthcard:['',Validators.required]
    })
    this.visa=false;
    this.mastercard=false;
    this.cvv="";
    this.name="";
    this.month="";
    this.year="";
    this.card=""; 
    this.american=false;;
  }

  get f() { return this.formCredit.controls;}



  validateCard(){
    //algoritmo de luhn
  }

  onClickPay(){
    this.submitted=true;
    let credit:CreditCard;
    if(this.formCredit.valid){
      credit={
        cvv:this.cvv,
        idPolicy:this.id,
        month:this.month,
        name:this.name,
        number:this.card,
        year:this.year
      }
      this.spinner.show();
      this.policyService.payCreditCard(credit).subscribe(
        res=>{          
          if(res=='KO'){
            this.spinner.hide()
            this.router.navigate(['finproceso','ko'])
          }else if(res=='OK'){
            this.spinner.hide()
            this.router.navigate(['finproceso','ok'])
          }else{
            this.spinner.hide();
            this.toastr.error("Ocurrio un error al completar la accion,no se logro pagar con tarjeta ni con pago directo","Error")
          }
         
        },
        err=>{
          
        }
      )
     
    }
    
  }

  onClickBack(){
    this.location.back()
  }

  validateTypeCard(){
    
    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    var amexpRegEx = /^(?:3[47][0-9]{13})$/;
    if(visaRegEx.test(this.card)){
      this.visa=true;
      this.american=false;
      this.mastercard=false;
    }else if(mastercardRegEx.test(this.card)){
      this.mastercard=true;
      this.visa=false;
      this.american=false;
    }else if(amexpRegEx.test(this.card)){
      this.american=true;
      this.visa=false;
      this.mastercard=false;
    }else{
      this.american=false;
      this.visa=false;
      this.mastercard=false;
    }
    
  }

  onKeyDownCard(){

    this.validateTypeCard();
  }

}
