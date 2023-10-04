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

   saveCategories(category:any){
    return this.commService.post("/category/",category)
  }
  deleteCategories(id){
    return this.commService.delete("/category/"+id)
  }
}
