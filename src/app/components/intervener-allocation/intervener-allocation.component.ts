import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/model/Person';

@Component({
  selector: 'app-intervener-allocation',
  templateUrl: './intervener-allocation.component.html',
  styleUrls: ['./intervener-allocation.component.css']
})
export class IntervenerAllocationComponent implements OnInit {

  person:Person;

  constructor() { }

  ngOnInit(): void {


   
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
  }


  setValuePerson(){    
    this.person=JSON.parse(localStorage.getItem("persontmp"));
    console.log(this.person);
  }

}
