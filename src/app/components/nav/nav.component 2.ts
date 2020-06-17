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

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  
    this.app_name="Itaca"
    
    this.isLogged= this.auth.isLogged();
    
  }

  onClickLogout(){
    this.auth.logout();
  }

}
