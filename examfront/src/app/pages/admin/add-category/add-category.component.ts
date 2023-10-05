import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category = {
    categoryId:null,
    categoryName: "",
    descriptions: ""
  }
  formTitle:any='Add ';



  constructor(private catService: CategoryService,
    private snak: MatSnackBar,
    private router: Router,private comservice:ApiCommonService) { 

      if (this.router.getCurrentNavigation().extras.state!=null) {
        
        console.log("this.router.getCurrentNavigation().extras.state.categoryId;",this.router.getCurrentNavigation().extras.state.categoryId);
        let id =this.router.getCurrentNavigation().extras.state.categoryId;
        this.formTitle='Edit';
        this.getCategoryDetails(id)
        
      }
    }

  ngOnInit(): void {
   
      
    

  }

  getCategoryDetails(id:number){

  this.comservice.get('/category/'+id).subscribe((res:any)=>{
    this.category=res;
  })

  }


  addCategory() {
    if (this.category.categoryName.trim() == '' || this.category.categoryName == null) {
      this.snak.open("Category name is null", "", {
        duration: 3000, verticalPosition: 'top'
      })
      return

    } else {
      console.log("formSubmited");

      this.catService.saveCategories(this.category).subscribe(
        (data) => {
          console.log(data);
          Swal.fire(
            'Good job!',
            data.message,
            'success',
          )
          this.router.navigate(['admin/category']);

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

  updateCategory(){
    if (this.category.categoryName.trim() == '' || this.category.categoryName == null) {
      this.snak.open("Category name is null", "", {
        duration: 3000, verticalPosition: 'top'
      })
      return

    } else {
      console.log("formSubmited");

      this.comservice.put("/category/",this.category).subscribe(
        (data) => {
          console.log(data);
          Swal.fire(
            'Good job!',
            data.message,
            'success',
          )
          this.router.navigate(['admin/category']);

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
}
