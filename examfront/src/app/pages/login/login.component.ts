import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDetails: any = {
    username: "",
    password: ""
  }
  constructor(private snackBar: MatSnackBar,
    private loginservice: LoginService,
    private apiCommonService: ApiCommonService,
    private router:Router) { }

  ngOnInit(): void {
  }
  formsubmit() {
    // login 
    if (this.loginDetails.username.trim() == '' || this.loginDetails.username == null || this.loginDetails.password.trim() == '' || this.loginDetails.password == null) {
      this.snackBar.open("Please fill user name and pasword", 'ok', {
        duration: 2000,
        verticalPosition: 'top'
      });
      return;
    }
    this.loginservice.generateToken(this.loginDetails).subscribe((data) => {
  

   
      this.loginservice.loginUser(data.token)
      this.apiCommonService.getCurrentUser().subscribe((user) => {
        this.loginservice.setUser(user);
        if (this.loginservice.getUserRole() == "ADMIN") {
          // redirect to admin dashboard 
          window.location.href = '/admin'

        } else if (this.loginservice.getUserRole() == "NORMAL") {
          // REDIRECT TO  NORMAL USER DHASBOARD
          // window.location.href = '/user'
          this.router.navigate(['user']);

        } else{

          this.loginservice.logOut()
        }

      }, (error: any) => {

        this.snackBar.open("Invalid Credentials !!", 'ok', {
          duration: 2000,
          verticalPosition: 'top'
        });
        return;
      })

    }, (error) => {


      this.snackBar.open("Invalid Credentials !!", 'ok', {
        duration: 2000,
        verticalPosition: 'top'
      });
      return;

    })
  }

}
