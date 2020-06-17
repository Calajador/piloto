import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  app_name:string;
  isLogged:boolean;

  constructor(private auth:AuthService) {
    this.auth.currentUser.subscribe(
      res=>{
        console.log(res);
      }
    );
   }

  ngOnInit(): void {
  
    this.app_name="Itaca"
    
    
    
  }

  onClickLogout(){
    this.auth.logout();
  }

}
