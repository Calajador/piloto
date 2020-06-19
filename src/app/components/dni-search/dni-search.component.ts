import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';
import { Identification } from 'src/app/model/Identification';
import { FormGroup, FormControl, Validators,FormBuilder  }  from '@angular/forms';
import { Person } from 'src/app/model/Person';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dni-search',
  templateUrl: './dni-search.component.html',
  styleUrls: ['./dni-search.component.css']
})
export class DniSearchComponent implements OnInit {

  identification:Identification;
  person:Person;
  failure:boolean;
  type:string;
  searchForm:any;

  constructor(private router:Router
    ,private formBuilder:FormBuilder
    ,private _route:ActivatedRoute
    ,private spinner: NgxSpinnerService
    ,private personService:PersonService) { }

  ngOnInit(): void {

    this.type=this._route.snapshot.paramMap.get('type');

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
    
    this.spinner.show(); 
    this.personService.searchPerson(this.identification).subscribe(
     
      res=>{
        
        console.log(res) 
        if(res.identifications.length>0){
          if(this.type!='insured'){
            localStorage.setItem("personholder",JSON.stringify(res));
          }else{
            localStorage.setItem("personinsured",JSON.stringify(res));
           
          }
         
          this.router.navigate(['/asignacion',this.type])
        }else{
          this.failure=true;
        }
        this.spinner.hide();
        this.person=res;

      }, 
      err=>{
        this.failure=true;
        this.spinner.hide();
        console.log(err);
      }
    )
  } 

  onClickBack(){
    this.router.navigate(['/regular',this.type]);
  }

}
