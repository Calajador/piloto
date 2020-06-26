import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/model/Person';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { IfStmt } from '@angular/compiler';
import { MasterService } from 'src/app/services/master.service';
import { Country } from 'src/app/model/Country';
@Component({
  selector: 'app-intervener-allocation',
  templateUrl: './intervener-allocation.component.html',
  styleUrls: ['./intervener-allocation.component.css']
})
export class IntervenerAllocationComponent implements OnInit {

  person:Person;
  switchInsured:boolean;
  type:string;
  idCountry:number;
  countries:Country[];

  intervenerForm:any;

  @Input('summaryType')
  summaryType: string;

  constructor(private formBuilder:FormBuilder,
    private _route:ActivatedRoute,
    private _location: Location,
    private masterService:MasterService,
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

    this.idCountry=this.person.addresses[0].idCountry;
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
      inter_country:['']
    })
    this.getCountries();
   
   
  }

  onChangeInsured(event){
    this.switchInsured=!this.switchInsured;
  }



  getCountries(){
    this.masterService.getCountries().subscribe(
      res=>{
        this.countries=res;
      },
      err=>{
        console.log(err);
      }
    )
  }


  setValuePerson(){
   
    var tmp='';

    if(this.summaryType){ 
        if(this.summaryType!='policy'){
          tmp=localStorage.getItem("personinsured")
        }else{
          tmp=localStorage.getItem("personholder");        
        }
    }else{
      if(this.type!='insured'){
        tmp=localStorage.getItem("personholder");
      }else{
        tmp=localStorage.getItem("personinsured")
      }
    }
  
    
    if(tmp){
      this.person=JSON.parse(tmp);      
    }

    if(this.person.identifications.length==0){
      this.person.identifications.push(
        {
          idCountry:0,
          identification:'',
          type:'DOCUMENTO_NACIONAL_IDENTIDAD'
        }
      )
    }

    if(this.person.addresses.length==0){
      this.person.addresses.push(
        {
          floor:0,
          idCountry:0,
          number:0,
          postalCode:'',
          province:'',
          street:''
        }
      )
    }
   
    console.log(this.person);
  }

  onClickContinue(){
    
    if(this.type!='insured'){
      if(this.switchInsured){
        localStorage.setItem("insured",this.person.id);
        localStorage.setItem("policyholder",this.person.id);
        localStorage.setItem("personinsured",JSON.stringify(this.person))
        localStorage.setItem("personholder",JSON.stringify(this.person))
        this.router.navigate(['/adicional'])      
      }else{
        this.router.navigate(['/regular','insured'])
      }
    }else{
      localStorage.setItem("personinsured",JSON.stringify(this.person));
      localStorage.setItem("insured",this.person.id);
      this.router.navigate(['/adicional'])  
    }
    
  }

  onClickBack(){
    this._location.back();
  }

}
