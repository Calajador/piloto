import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-additional',
  templateUrl: './account-additional.component.html',
  styleUrls: ['./account-additional.component.css']
})
export class AccountAdditionalComponent implements OnInit {

  switchAccount:boolean;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.switchAccount=false;
  }

  onChangeAccount(event){
    this.switchAccount=!this.switchAccount;
  }

  onClickContinue(){
    if(this.switchAccount){

    }else{
      this.router.navigate(['finproceso'])
    }
    
  }

  onClickBack(){
    this.router.navigate(['fincontratacion'])
  }

}
