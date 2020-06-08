import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';
import { Identification } from 'src/app/model/Identification';
import { FormGroup, FormControl, Validators,FormBuilder  }  from '@angular/forms';
import { Person } from 'src/app/model/Person';


@Component({
  selector: 'app-dni-search',
  templateUrl: './dni-search.component.html',
  styleUrls: ['./dni-search.component.css']
})
export class DniSearchComponent implements OnInit {

  identification:Identification;
  person:Person;
  failure:boolean;
  searchForm:any;

  constructor(private router:Router
    ,private formBuilder:FormBuilder
    ,private personService:PersonService) { }

  ngOnInit(): void {

    this.failure=false;
    this.identification={
      identification:"",
      idCountry:0,
      type:""
    }

    
    this.searchForm = this.formBuilder.group({
      frm_dni: ['']
    });
  }

  onClickContinue(){    
    this.personService.searchPerson(this.identification).subscribe(
      res=>{
        console.log(res) 
        if(res.identifications.length>0){
          localStorage.setItem("token",JSON.stringify(res));
        }else{
          this.failure=true;
        }
        this.person=res;

      }, 
      err=>{
        console.log(err);
      }
    )
  } 

  onClickBack(){
    this.router.navigate(['/regular']);
  }

}
