import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category = {
    categoryName: "",
    descriptions: ""
  }



  constructor(private catService: CategoryService,
    private snak: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {

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

}
