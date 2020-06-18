import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common'
@Component({
  selector: 'app-regular-customer',
  templateUrl: './regular-customer.component.html',
  styleUrls: ['./regular-customer.component.css']
})
export class RegularCustomerComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private router:Router,
    private location:Location,
    private _route:ActivatedRoute) { }

  regularPersonForm:any;
  isSubmitted = false;
  type:string;
  personSelected:string;

  ngOnInit(): void {
    this.type=this._route.snapshot.paramMap.get('type');
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
      this.router.navigate(['/dni',this.type]);
    }else if(this.personSelected=="NO"){
      this.router.navigate(['/altapersona',this.type]);
    }
  }

  onClickBack(){
    this.location.back();
  }

}
