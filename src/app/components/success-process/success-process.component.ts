import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success-process',
  templateUrl: './success-process.component.html',
  styleUrls: ['./success-process.component.css']
})
export class SuccessProcessComponent implements OnInit {

  type:string;

  constructor(private router:Router,
    private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.type=this._route.snapshot.paramMap.get('success');
  }

  onClickFinish(){
    localStorage.removeItem("personholder");
    localStorage.removeItem("personinsured");
    localStorage.removeItem("policyholder");
    localStorage.removeItem("vehicle");
    localStorage.removeItem("insured");
    this.router.navigate(['producto'])
  }

}
