import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-process',
  templateUrl: './success-process.component.html',
  styleUrls: ['./success-process.component.css']
})
export class SuccessProcessComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onClickFinish(){
    localStorage.setItem("persontmp","");
    localStorage.setItem("policyholder","");
    localStorage.setItem("vehicle","");
    localStorage.setItem("insured","");
    this.router.navigate(['producto'])
  }

}
