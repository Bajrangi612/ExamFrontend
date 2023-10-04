import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
categories:any = []
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe((data)=>{
      console.log("response is --",data);
      
      this.categories = data;
      
    }),(error)=>{
      console.log(error);
      Swal.fire("Error !!","Something went Wrong","error")
      
    }
  }

}
