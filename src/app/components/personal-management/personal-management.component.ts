import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Person } from 'src/app/model/Person';
import { Address } from 'src/app/model/Address';
import { Identification } from 'src/app/model/Identification';
import { PersonService } from 'src/app/services/person.service';
import { DatePipe } from '@angular/common';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { Country } from 'src/app/model/Country';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-personal-management',
  templateUrl: './personal-management.component.html',
  styleUrls: ['./personal-management.component.css']
})
export class PersonalManagementComponent implements OnInit {

  personForm:any;
  submitted:boolean;
  person:Person;
  countries:Country[];
  type:string;
  address:Address;
  identification:Identification;

  constructor(private router:Router,
    private formBuilder:FormBuilder,
    private datePipe: DatePipe,
    private masterService:MasterService,
    private spinner:NgxSpinnerService,
    private _route:ActivatedRoute,
    private personService:PersonService) { }

  ngOnInit(): void {
    this.submitted=false;
    
    this.type=this._route.snapshot.paramMap.get('type');
    this.personForm = this.formBuilder.group({
      name_singup: ['', [Validators.required]],
      surname_singup: ['', [Validators.required]],
      dni_singup: ['', [Validators.required]],
      date_singup: ['', [Validators.required]],
      address_singup: ['', [Validators.required]],
      number_singup: [''],
      floor_singup: [''],
      city_singup: ['', [Validators.required]],
      postalcode_singup: ['', [Validators.required,Validators.maxLength(4)]],
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

    this.getCountry();
    
  }


  onChangeCountry(event){   
    
  }

  getCountry(){
    this.masterService.getCountries().subscribe(
      res=>{
        this.countries=res;
        this.address.idCountry=32;
      },
      err=>{
        console.log(err);
      }
    )
    
  }

  get f() { return this.personForm.controls;}

  onClickContinue(){
 
    this.submitted=true;  

    if(this.personForm.valid){
      this.spinner.show();
      let idCountry=+this.address.idCountry      
      this.address.idCountry=idCountry;
      this.identification.idCountry=idCountry;
      this.person.identifications=[];
      this.person.addresses=[];
      this.person.dateBorn=this.format(this.person.dateBorn);
      this.person.identifications.push(this.identification);
      this.person.addresses.push(this.address);
      this.personService.createPerson(this.person).subscribe(
        res=>{     
                       
          if(this.type=='policy'){
            localStorage.setItem("policyholder",res[0].id) 
            localStorage.setItem("personholder",JSON.stringify(res[0]));
            this.router.navigate(['/asignacion','policy']) 
            
          }else{
            localStorage.setItem("personinsured",JSON.stringify(res[0]));
            localStorage.setItem("insured",res.id)
          }
          
        
          this.spinner.hide();
        },
        err=>{
          this.spinner.hide();
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
    this.router.navigate(['/regular',this.type]);
  }


}
