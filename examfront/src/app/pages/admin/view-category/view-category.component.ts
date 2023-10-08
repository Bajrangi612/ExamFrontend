import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service'
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css'],
  // standalone: true
})
export class ViewCategoryComponent implements OnInit {
  categories: any = []
  constructor(private categoryService: CategoryService,
    private router: Router,
    private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.categories().subscribe((data) => {
      // console.log("response is --",data);

      this.categories = data;

    }, (error) => {
      // console.log(error);
      Swal.fire("Error !!", "Something went Wrong", "error")

    })
  }


  deleteCategory(id) {

    Swal.fire({
      icon: 'question',
      title: 'Are you sure want to delete Quiz ?',
      text: "All the quizzes of this category will be deleted !",
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategories(id).subscribe(
          (data) => {
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
    })




  }

  openDialog() {
    return this.dialog.open(DialogAnimationsExampleDialog,
      {
        width: '250px',
      })
  }

  navigateFunc(cId: any) {
    this.router.navigate(['/admin/addCategory'], { state: { categoryId: cId } })
  }


}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './dialog-animations-example-dialog.html',
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) { }
}
