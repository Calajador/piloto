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
    localStorage.removeItem("persontmp");
    localStorage.removeItem("policyholder");
    localStorage.removeItem("vehicle");
    localStorage.removeItem("insured");
    this.router.navigate(['producto'])
  }

}
