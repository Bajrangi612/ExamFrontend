import { Injectable } from '@angular/core';
import { ApiCommonService } from './api-common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiCommonService: ApiCommonService
  ) { }

  getCurrentUser(){
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  // let token
  public getToken() {
    return localStorage.getItem("token");
  }
  //  set user data in local  storage
  public setUser(userDetails) {
    localStorage.setItem("user", JSON.stringify(userDetails));
  }

  // getUser
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logOut();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
