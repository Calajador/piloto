import { Component, OnInit } from '@angular/core';
import { PolicyProcess } from 'src/app/model/PolicyProcess';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from 'src/app/services/policy.service';
import { BankInvoicing } from 'src/app/model/BankInvoicing';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common'


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
    private _location:Location,
    private router:Router) { }

  ngOnInit(): void {
    this.type=this._route.snapshot.paramMap.get('type');
  }

  onClickBack(){
    this._location.back();
  }

 


}
