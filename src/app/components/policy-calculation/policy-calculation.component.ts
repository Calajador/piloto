import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy-calculation',
  templateUrl: './policy-calculation.component.html',
  styleUrls: ['./policy-calculation.component.css']
})
export class PolicyCalculationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onClickContinue(){
    this.router.navigate(['cuenta']);
  }

  onClickBack(){
    this.router.navigate(['coberturas'])
  }

}
