import { Component, OnInit, Output , OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 
visibleLoginbutton:boolean=true;
visibleRegisterbutton:boolean=true;



  user = null;
  isloggedIn = false;
  isRouterActive: any;

  constructor(public loginService:LoginService,
    private router:Router,
    private activatedRouter: ActivatedRoute) { 
     
    }
   
  ngOnInit(): void {
     this.isloggedIn =  this.loginService.isLoggedIn();
     if(this.isloggedIn)
     this.user = this.loginService.getUser();
    

    //  console.log(this.isloggedIn , "navbar loaded");
     
    
    //  this.isRouterActive = this.activatedRouter.snapshot;
    //  console.log(snapshot._routeConfig.component.name);
     
  }
  // ngOnDestroy(): void {
  //   this.isloggedIn =  this.loginService.isLoggedIn();
  //   if(this.isloggedIn)
  //   this.user = this.loginService.getUser();

  //   console.log(this.isloggedIn , "navbar loaded");
  // }
  logout(){
    this.visibleLoginbutton=true;
    this.visibleRegisterbutton=true;
    this.loginService.logOut();
    this.router.navigate([''])
    this.isloggedIn = false;
    console.log("is logged in",this.isloggedIn);
    
  }
  makeLoginRefisterVisible(){
    this.visibleLoginbutton=true;
    this.visibleRegisterbutton=true;
  }
  

}
