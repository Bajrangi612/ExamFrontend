import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCommonService } from './api-common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiCommonService : ApiCommonService) {
    
   }


  addUser(user:any){
 return this.apiCommonService.post("/user/",user)
  //  return this.http.post(`${baseUrl}/user/`,user)
  }
}
