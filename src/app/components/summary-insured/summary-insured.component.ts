import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Person } from 'src/app/model/Person';
import { MasterService } from 'src/app/services/master.service';
import { Country } from 'src/app/model/Country';

@Component({
  selector: 'app-summary-insured',
  templateUrl: './summary-insured.component.html',
  styleUrls: ['./summary-insured.component.css']
})
export class SummaryInsuredComponent implements OnInit {

  intervenerForm:any;
  person:Person;
  countries:Country[];
  idCountry:number;
  constructor(private formBuilder:FormBuilder,
    private masterService:MasterService) { }

  ngOnInit(): void {

    this.person=JSON.parse(localStorage.getItem("personholder"))

    this.intervenerForm=this.formBuilder.group({
      summary_firtsname:[this.person.firstName],
      summary_lastname:[this.person.lastName],
      summary_dni:[this.person.identifications[0].identification],
      summary_bitrtay:[this.person.dateBorn],
      summary_address:[this.person.addresses[0].street],
      summary_number:[this.person.addresses[0].number],
      summary_floor:[this.person.addresses[0].floor],
      summary_city:[this.person.addresses[0].province],
      summary_codepostal:[this.person.addresses[0].postalCode],
      summary_country:['']
    })

    this.getCountries();
  }

  getCountries(){
    this.masterService.getCountries().subscribe(
      res=>{
        this.countries=res;
        this.idCountry=this.person.addresses[0].idCountry
      },
      err=>{
        console.log(err);
      }
    )
  }

}
