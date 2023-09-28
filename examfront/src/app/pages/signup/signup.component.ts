import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 

  constructor( private userService:UserService,
    private snackBar : MatSnackBar) { }
  public user ={
    username:"",
    password:"",
    firstName:"",
    lastName:"",
    email:"",
    phone:""
  }
  abc:any= 'ghgg';

  ngOnInit(): void {
  }

  formSubmit(){
    
    if(this.user.username==''|| this.user.username ==null)
    {
      // alert("user Name is required");
      this.snackBar.open("username is required", 'Undo',{
        duration:2000,
        verticalPosition:'top'
      });
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        // Success
        // console.log(data.message);
        this.snackBar.open(data.message, 'Undo',{
          duration:2000,
          verticalPosition:'top'
        });
        // alert(data.message)
        
      },(error)=>{
        //  error
        // console.log(error.error.message);
        // alert(error.error.message);
        this.snackBar.open(error.error.message, 'ok',{
          duration:2000,
          verticalPosition:'top'
        });
      }
    )
    // alert("form submit");
  }

}
