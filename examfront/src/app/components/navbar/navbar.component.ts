import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user = null;
  isloggedIn = false;

  constructor(public loginService:LoginService,
    private router:Router) { }

  ngOnInit(): void {
     this.isloggedIn =  this.loginService.isLoggedIn();
     this.user = this.loginService.getUser();
  }
  logout(){

    this.loginService.logOut();
    this.router.navigate([''])
  }
  

}
