import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/model/Person';
import { FormBuilder } from '@angular/forms';
import { DrivingLicense } from 'src/app/model/DrivingLicense';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-additional-data-person',
  templateUrl: './additional-data-person.component.html',
  styleUrls: ['./additional-data-person.component.css']
})
export class AdditionalDataPersonComponent implements OnInit {

  person:Person;
  drivingLicenses:DrivingLicense;
  gender:string;
  obtaning:string;
  lincense:number;
  number_int:string;
  additionalForm:any
  constructor(private personService:PersonService,
    private datePipe: DatePipe,
    private router:Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    
    this.person={
      addresses:[],
      dateBorn:null,
      drivingLicenses:[],
      firstName:"",
      lastName:"",
      gender:"",
      identifications:[]


    }
    this.person=JSON.parse(localStorage.getItem("persontmp"));
    this.gender="";
    this.obtaning="";
    this.lincense=0;
    this.additionalForm=this.formBuilder.group({
      licenses_intervening:[''],
      number_intervening:[''],
      obtaning_intervening:[''],
      gender_intervening:['']
    })
  }

  formAdd(){
    return this.additionalForm.controls;
  }

  onChangeGender(){
    this.gender=this.formAdd().gender_intervening.value;    
  }

  onChangeLicenses(){
    this.lincense=this.formAdd().licenses_intervening.value;
  }

  onClickContinue(){
    
    this.drivingLicenses={
      date:this.format(this.obtaning),
      numberLicense:this.number_int,
      type:this.lincense,    
    }
    
   
    this.person.drivingLicenses.push(this.drivingLicenses);
    this.person.gender=this.gender;
    this.personService.createPerson(this.person).subscribe(
      res=>{
        this.router.navigate(['altavehiculo']);
      },
      err=>{
        console.log(err);
      }
    )
  }

  onClickBack(){

  }

  format(date){
    const dateSendingToServer = this.datePipe.transform(date, 'dd-MM-yyyy')
    return dateSendingToServer
  }




  

}
