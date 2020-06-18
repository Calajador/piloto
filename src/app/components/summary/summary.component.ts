import { Component, OnInit } from '@angular/core';
import { PolicyProcess } from 'src/app/model/PolicyProcess';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  policy:PolicyProcess;
  type:string;

  constructor(private _route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.type=this._route.snapshot.paramMap.get('type');
  }

  onClickConfirm(){
  
    this.policy={
      agent:localStorage.getItem("username"),
      insured:+localStorage.getItem("insured"),
      payment:JSON.parse(localStorage.getItem("payment")),
      policy:JSON.parse(localStorage.getItem("policy")),
      policyHolder:+localStorage.getItem("policyholder"),
      vehicle:JSON.parse(localStorage.getItem("vehicle"))
    }

    

    if(this.type=='credit'){
      this.router.navigate(['tarjeta'])
    }else{
      this.router.navigate(['finproceso'])
    }
  
  }



}
