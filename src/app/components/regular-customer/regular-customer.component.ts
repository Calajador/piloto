import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regular-customer',
  templateUrl: './regular-customer.component.html',
  styleUrls: ['./regular-customer.component.css']
})
export class RegularCustomerComponent implements OnInit {

  constructor(private fb:FormBuilder,private router:Router) { }

  regularPersonForm:any;
  isSubmitted = false;
  personSelected:string;

  ngOnInit(): void {
    this.personSelected="";
    this.regularPersonForm = this.fb.group({
      radio: ['', [Validators.required]]
    })
  }

  
  get formRP() {
    return this.regularPersonForm.controls;
  }

  onSelectRegularPerson(value){
    this.isSubmitted=true;
    if(value!=""){
      this.personSelected=value;
    }
    
  }

  onClickContinue(){
    if(this.personSelected=="SI"){
      this.router.navigate(['/dni']);
    }else if(this.personSelected=="NO"){
      this.router.navigate(['/altapersona']);
    }
  }

  onClickBack(){
    this.router.navigate(['/producto']);
  }

}
