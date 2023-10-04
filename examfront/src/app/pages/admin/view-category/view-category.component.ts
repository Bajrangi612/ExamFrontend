import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
categories:any = []
  constructor(private categoryService:CategoryService,
    private router: Router) {
     
     }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(){
    this.categoryService.categories().subscribe((data)=>{
      // console.log("response is --",data);
      
      this.categories = data;
      
    },(error)=>{
      // console.log(error);
      Swal.fire("Error !!","Something went Wrong","error")
      
    })
  }


  deleteCategory(id){
      // console.log(id, "wll be deleted");
      this.categoryService.deleteCategories(id).subscribe(
        (data) => {
          
          // console.log(data);
          Swal.fire(
            'Good job!',
            data.message,
            'success',
          )
          this.getCategories();

        }, (error) => {
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            text: 'Please Try Again..',
            timer: 5000
          })
        }
      )
      
  }

}
