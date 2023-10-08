import { Injectable } from '@angular/core';
import { ApiCommonService } from './api-common.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public logInStatusSubject = new Subject<boolean>();

  constructor(private apiCommonService: ApiCommonService,
    private router:Router

  ) { }

  getCurrentUser() {
    this.apiCommonService.get("/")
  }

  // generate token -----

  public generateToken(loginDetails: any) {
    return this.apiCommonService.post("/generate-token", loginDetails)
  }

  // Login User
  public loginUser(token) {
    localStorage.setItem("token", token);

  }

  public isLoggedIn() {
    let tokenstr = localStorage.getItem("token");
    if (tokenstr == undefined || tokenstr == '' || tokenstr == null) {
      return false;
    }
    return true;
  }
  //   log out -- remove token from  local storage
  public logOut() {
    // console.log(" logout method called ...");

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['']);

  }

  // let token
  public getToken() {
    return localStorage.getItem("token");
  }
  //  set user data in local  storage
  public setUser(userDetails) {
    // console.log(" User details in login service"+userDetails);

    localStorage.setItem("user", JSON.stringify(userDetails));
  }

  // getUser
  public getUser() {
    let userStr = localStorage.getItem("user");
    // console.log(userStr);

    if (userStr != null) {
      // console.log(JSON.parse(userStr));
      return JSON.parse(userStr);
    } else {
      // this.logOut();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    // console.log(user);

    return user.authorities[0].authority;
  }

}
