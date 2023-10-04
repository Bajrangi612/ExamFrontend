import { Injectable } from '@angular/core';
import { ApiCommonService } from './api-common.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private commService:ApiCommonService) { }
  public categories(){
    return this.commService.get("/category/")
  }
}
