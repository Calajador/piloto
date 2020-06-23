import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/model/Person';
import { FormBuilder, Validators } from '@angular/forms';
import { DrivingLicense } from 'src/app/model/DrivingLicense';
import {Location} from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { License } from 'src/app/model/License';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-additional-data-person',
  templateUrl: './additional-data-person.component.html',
  styleUrls: ['./additional-data-person.component.css']
})
export class AdditionalDataPersonComponent implements OnInit {

  person:Person;
  drivingLicenses:DrivingLicense;
  licenses:License[];
  gender:string;
  obtaning:string;
  lincense:number;
  type_license:number;
  number_int:string;
  additionalForm:any
  constructor(private personService:PersonService,
    private datePipe: DatePipe,
    private router:Router,
    private spinner:NgxSpinnerService,
    private masterService:MasterService,
    private _location: Location,
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
    this.person=JSON.parse(localStorage.getItem("personinsured"));
    this.gender=this.person.gender;
    this.obtaning="";
    this.lincense=0;
    
    this.additionalForm=this.formBuilder.group({
      licenses_intervening:['',Validators.required],
      number_intervening:['',Validators.required],
      obtaning_intervening:['30-12-2007',Validators.required],
      gender_intervening:['',Validators.required]
    })
    this.getDrivingLicenses();
    this.setValueAdditionalData();
  }

  getDrivingLicenses(){
    this.masterService.getDrivingLicenses().subscribe(
      res=>{
        this.licenses=res;
      },
      err=>{
        console.log(err);
      }
    )
  }

  formAdd(){
    return this.additionalForm.controls;
  }

  onChangeGender(){
    this.gender=this.formAdd().gender_intervening.value;    
  }

  onChangeLicenses(){
    this.type_license=this.formAdd().licenses_intervening.value;
  }

  onClickContinue(){
    
    this.person.drivingLicenses=[];

    if(this.additionalForm.valid ){

      this.drivingLicenses={
        date:this.format(this.obtaning),
        numberLicense:this.number_int,
        type:this.type_license,    
      }
      
      
      this.person.drivingLicenses.push(this.drivingLicenses);
      this.person.gender=this.gender;
      this.spinner.show()
      this.personService.createPerson(this.person).subscribe(
        res=>{
          this.spinner.hide();
          this.router.navigate(['altavehiculo']);
        },
        err=>{
          this.spinner.hide();
          console.log(err);
        }
      )
    }
   
  }

  setValueAdditionalData(){
  
    let person:Person= JSON.parse(localStorage.getItem("personinsured"));
    if(person.drivingLicenses.length>0){
      this.drivingLicenses=person.drivingLicenses[0];
      this.number_int=this.drivingLicenses.numberLicense;
      this.type_license=this.drivingLicenses.type;
      this.yesterdayDateFilter();
      this.gender=person.gender;
    }
  }

  onClickBack(){
    this._location.back();
  }

  format(date){
    const dateSendingToServer = this.datePipe.transform(date, 'dd-MM-yyyy')
    return dateSendingToServer
  }

  yesterdayDateFilter(){        
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    this.obtaning = this.datePipe.transform(yesterday, 'yyyy-MM-dd');
 
  
 }




  

}
