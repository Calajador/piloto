import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Person } from 'src/app/model/Person';
import { Address } from 'src/app/model/Address';
import { Identification } from 'src/app/model/Identification';
import { PersonService } from 'src/app/services/person.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-personal-management',
  templateUrl: './personal-management.component.html',
  styleUrls: ['./personal-management.component.css']
})
export class PersonalManagementComponent implements OnInit {

  personForm:any;
  submitted:boolean;
  person:Person;
  address:Address;
  identification:Identification;

  constructor(private router:Router,
    private formBuilder:FormBuilder,
    private datePipe: DatePipe,
    private personService:PersonService) { }

  ngOnInit(): void {
    this.submitted=false;
    this.personForm = this.formBuilder.group({
      name_singup: ['', [Validators.required]],
      surname_singup: ['', [Validators.required]],
      dni_singup: ['', [Validators.required]],
      date_singup: ['', [Validators.required]],
      address_singup: ['', [Validators.required]],
      number_singup: [''],
      floor_singup: [''],
      city_singup: ['', [Validators.required]],
      postalcode_singup: ['', [Validators.required]],
      country_singup: ['', [Validators.required]],
    });

    
    this.address={
      idCountry:null,
      floor:null,
      postalCode:"",
      street:"",
      province:"",
      number:null
      
    }

    this.identification={
      identification:"",
      idCountry:this.address.idCountry,
      type:"DOCUMENTO_NACIONAL_IDENTIDAD"  

    }

    this.person={
      firstName:"",
      lastName:"",
      gender:"ND",
      dateBorn:null,
      drivingLicenses:[],
      identifications:[],
      addresses:[]
    }

    this.existPersonTmp();

    
  }

  existPersonTmp(){
    debugger;
    if(localStorage.getItem("persontmp")!=""){
      this.person=JSON.parse(localStorage.getItem("persontmp"));
    }
  }

  onChangeCountry(event){   
    
  }

  get f() { return this.personForm.controls;}

  onClickContinue(){
    this.submitted=true;       
    if(this.personForm.valid){
      let idCountry=+this.address.idCountry      
      this.address.idCountry=idCountry;
      this.identification.idCountry=idCountry;
      this.person.dateBorn=this.format(this.person.dateBorn);
      this.person.identifications.push(this.identification);
      this.person.addresses.push(this.address);
      this.personService.createPerson(this.person).subscribe(
        res=>{                     
          localStorage.setItem("insured",res.id)
          localStorage.setItem("policyholder",res.id) 
          localStorage.setItem("persontmp",JSON.stringify(res));
          this.router.navigate(['/asignacion'])  
        },
        err=>{
          debugger;
          console.log(err); 
        }
      )           
    }        
  }

  format(date){
    const dateSendingToServer = this.datePipe.transform(date, 'dd-MM-yyyy')
    return dateSendingToServer
  }






  onClickBack(){
    this.router.navigate(['/regular']);
  }


}
