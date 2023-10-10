import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private loginservice:LoginService,
    private router:Router) { }

  ngOnInit(): void {
    if (this.loginservice.getUserRole() == "ADMIN") {
          
      // redirect to admin dashboard 
      // window.location.href = '/admin';
      this.router.navigate(['admin']);
      this.loginservice.logInStatusSubject.next(true);

    } else if (this.loginservice.getUserRole() == "NORMAL") {
      // REDIRECT TO  NORMAL USER DHASBOARD
      // window.location.href = '/user'
      this.router.navigate(['user/0']);
      this.loginservice.logInStatusSubject.next(true);


    } else{

      this.loginservice.logOut()
    }
  }

  

}
