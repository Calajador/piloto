import { Component } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { ApiSecret } from './common/API/ApiSecret';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'itaca';
  secret:any;
  isLogged:boolean;

  constructor(private auth:AuthService){
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

 


}
