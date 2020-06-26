import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common'
import { FormBuilder, Validators } from '@angular/forms';
import { CreditCard } from 'src/app/model/CreditCard';
import { PolicyService } from 'src/app/services/policy.service';
import { BankInvoicing } from 'src/app/model/BankInvoicing';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  validCard:boolean;
  cvv:string;
  month:string;
  year:string;
  typeCard:string;
  formCredit:any;
  id:number;
  submitted:boolean;
  errorMonth:string;
  errorYear:string;

  constructor(private router:Router,
    private _route:ActivatedRoute,
    private policyService:PolicyService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    private location:Location) { }

  ngOnInit(): void {
    this.id=+this._route.snapshot.paramMap.get('id');

    let regexNumber="^[0-9]+$"

    this.formCredit=this.formBuilder.group({
      cardHolder:['',[Validators.required]],
      numcard:['',[Validators.required,Validators.pattern(regexNumber),Validators.minLength(16)]],
      yearcard:['',Validators.required],
      cvv_card:['',[Validators.required,Validators.maxLength(4),Validators.minLength(3)]],  
      monthcard:['',Validators.required]
    })
    this.visa=false;
    this.mastercard=false;

    this.cvv="";
    this.name="";
    this.month="";
    this.validCard=false;
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
    console.log(this.f);
    console.log(this.validateDate())
    
    if(this.formCredit.valid && this.validCard){
      if( this.validateDate()){
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
            if(res.response=='KO'){
              this.spinner.hide()
              this.router.navigate(['finproceso','koe'])
            }else if(res.response=='OK'){
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
     
    
    
  }

  validateDate():boolean{
    if(this.year!='' && this.month!=''){
      let yearString="20"+this.year
      let yearCurrent=+yearString;
      let monthCurrent=+this.f.monthcard.value
      var dateNow=new Date();
      var year=dateNow.getFullYear();
      var month=dateNow.getMonth()+1;
      
      if(yearCurrent>=year && monthCurrent>=month){
        return true;
      }else{
        this.f.yearcard.errors=true;
        this.f.monthcard.errors=true;
        this.errorYear="La tarjeta esta vencida";
        this.errorMonth="la tarjeta esta vencida";
        return false;
      }
    }else{
      this.errorYear="Digite un año";
      this.errorMonth="Digite un mes";
      return false;
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
      this.validCard=true;
    }else if(mastercardRegEx.test(this.card)){
      this.mastercard=true;
      this.visa=false;
      this.american=false;
      this.validCard=true;
    }else if(amexpRegEx.test(this.card)){
      this.american=true;
      this.visa=false;
      this.validCard=true;
      this.mastercard=false;
    }else{
      this.american=false;
      this.visa=false;
      this.validCard=false;
      this.mastercard=false;
      this.f.numcard.errors=true;
    }
    
  }

  onKeyDownCard(){

    this.validateTypeCard();
  }

}
