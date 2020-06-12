import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, Validators } from '@angular/forms';
import { ApiSecret } from 'src/app/common/API/ApiSecret';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;
  loginForm:any;
  secret:any;
  submitted = false;
  errMessage="";

  constructor(
    private authService:AuthService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router:Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });



    this.user={
      userName:'',
      userPassword:''
    }

    this.getToken()
  }

  get f() { return this.loginForm.controls;}

  onSingIn(){
    
    this.submitted=true;
    
    if(this.loginForm.status==='VALID'){
      this.spinner.show();
        this.authService.singIn(this.user).subscribe(
          res=>{
          
            console.log("login","entro")
            localStorage.setItem("username",this.user.userName)
            this.router.navigate(['/producto'])
            this.spinner.hide();
          },
          err=>{
            
            console.log(err);
            if(err.status===513){
              this.loginForm.controls.email.errors=true;
              this.errMessage="Usuario o contraseña incorrecta"
            }
            this.spinner.hide();
          }
        )
      
    }else{
      this.errMessage="Porfavor digite un email"
      return;
    }
  }

  getToken(){
    this.secret={
      grant_type:ApiSecret.grant_type,
      client_id:ApiSecret.client_id,
      client_secret:ApiSecret.client_secret,
      scope:ApiSecret.scope
    }
    this.authService.getToken(this.secret).subscribe(
      res=>{
        localStorage.setItem("token",res.access_token)
      },
      err=>{

      }
    )
  }



}
