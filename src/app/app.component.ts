import { Component } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { ApiSecret } from './common/API/ApiSecret';
import { Router } from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'itaca';
  secret:any;
  userName:string;
  isLogged:boolean;
  @ViewChild('exampleModal') closeAddExpenseModal: ElementRef;

  constructor(private auth:AuthService,private router:Router){
    this.auth.currentUser.subscribe( 
      res=>{
        this.userName=res;
        console.log(res);
      }
    );
    //this.getToken();
  }

  getToken(){
    this.secret={
      grant_type:ApiSecret.grant_type,
      client_id:ApiSecret.client_id,
      client_secret:ApiSecret.client_secret,
      scope:ApiSecret.scope
    }
    this.auth.getToken(this.secret)
  }

  leaveApp(){
    localStorage.removeItem("personholder");
    localStorage.removeItem("personinsured");
    localStorage.removeItem("policyholder");
    localStorage.removeItem("vehicle");
    localStorage.removeItem("payment");
    localStorage.removeItem("policy");
    localStorage.removeItem("insured");
    this.router.navigate(['producto'])
  }

 


}
