import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
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

  

  constructor(private router:Router,
    private location:Location) { }

  ngOnInit(): void {
    this.visa=false;
    this.mastercard=false;
    this.card=""; 
    this.american=false;;
  }


  validateCard(){
    //algoritmo de luhn
  }

  onClickPay(){
    this.router.navigate(['finproceso'])
  }

  onClickBack(){
    this.location.back()
  }

  typeCard(){
    
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

    this.typeCard();
  }

}
