import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private apiCommonService: ApiCommonService) { }

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
      console.log("success ...");
     
      console.log(data);
      this.loginservice.loginUser(data.token)
      this.apiCommonService.getCurrentUser().subscribe((user)=>{
        console.log(user);
        console.log("user LoggedIn..");
      },(error:any)=>{
        console.log("Error ...");
        console.log(error);
        this.snackBar.open("Invalid Credentials !!", 'ok', {
          duration: 2000,
          verticalPosition: 'top'
        });
        return;
      })

    },(error)=>{
      console.log("Error ...");
      console.log(error);
      
      this.snackBar.open("Invalid Credentials !!", 'ok', {
        duration: 2000,
        verticalPosition: 'top'
      });
      return;
      
    })
  }

}
