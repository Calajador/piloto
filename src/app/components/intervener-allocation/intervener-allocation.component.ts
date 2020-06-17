import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/model/Person';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-intervener-allocation',
  templateUrl: './intervener-allocation.component.html',
  styleUrls: ['./intervener-allocation.component.css']
})
export class IntervenerAllocationComponent implements OnInit {

  person:Person;
  switchInsured:boolean;
  type:string;

  intervenerForm:any;


  constructor(private formBuilder:FormBuilder,
    private _route:ActivatedRoute,
    private _location: Location,
    private router:Router) { }

  ngOnInit(): void {
  
    this.type=this._route.snapshot.paramMap.get('type');
    this.switchInsured=false;

    
    this.person={
      firstName:"",
      lastName:"",
      gender:"",
      dateBorn:null,
      drivingLicenses:[],
      identifications:[],
      addresses:[]
    }

    this.setValuePerson();

    this.intervenerForm=this.formBuilder.group({
      inter_firtsname:[this.person.firstName],
      inter_lastname:[this.person.lastName],
      inter_dni:[this.person.identifications[0].identification],
      inter_bitrtay:[this.person.dateBorn],
      inter_address:[this.person.addresses[0].street],
      inter_number:[this.person.addresses[0].number],
      inter_floor:[this.person.addresses[0].floor],
      inter_city:[this.person.addresses[0].province],
      inter_codepostal:[this.person.addresses[0].postalCode],
      inter_country:[this.person.addresses[0].idCountry]
    })
  }

  onChangeInsured(event){
    this.switchInsured=!this.switchInsured;
  }


  setValuePerson(){
    if(this.person)    
    this.person=JSON.parse(localStorage.getItem("persontmp"));
    console.log(this.person);
  }

  onClickContinue(){
    
    if(this.type!='insured'){
      if(this.switchInsured){
        localStorage.setItem("insured",this.person.id);
        localStorage.setItem("policy",this.person.id);
        this.router.navigate(['/adicional'])      
      }else{
        this.router.navigate(['/regular','insured'])
      }
    }else{
      localStorage.setItem("insured",this.person.id);
      this.router.navigate(['/adicional'])  
    }
    
  }

  onClickBack(){
    this._location.back();
  }

}
