import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-account-additional',
  templateUrl: './account-additional.component.html',
  styleUrls: ['./account-additional.component.css']
})
export class AccountAdditionalComponent implements OnInit {

  switchAccount:boolean;

  constructor(private router:Router,
    private _location: Location) { }

  ngOnInit(): void {
    this.switchAccount=false;
  }

  onChangeAccount(event){
    this.switchAccount=!this.switchAccount;
  }

  onClickContinue(){
    if(this.switchAccount){
      this.router.navigate(['tarjeta'])
    }else{
      this.router.navigate(['finproceso'])
    }
    
  }

  onClickBack(){
    this._location.back();
  }

}
