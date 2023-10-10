import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  formTitle: any = 'Add ';
  quiz !: FormGroup;
  finalQuizObj: any = {
    quizId: null,
    quizName: [null, Validators.required],
    isActive: null,
    description: null,
    noOfQuestion: null,
    totalMarks: null,
    category: {
      categoryId: null,
      categoryName: null,
      descriptions: null
    }
  }

  categories: any = []
  selectedCategory: any;




  constructor(private _fb: FormBuilder,
    private apiCommomService: ApiCommonService,
    private router: Router) {
    this.quiz = this._fb.group({
      quizId: null,
      quizName: null,
      isActive: false,
      description: null,
      noOfQuestion: null,
      totalMarks: null,
      category: null


    })
    this.getAllCategories();

    if (this.router.getCurrentNavigation().extras.state != null) {
      console.log("this.router.getCurrentNavigation().extras.state.quizId;", this.router.getCurrentNavigation().extras.state.quizId);
      let id = this.router.getCurrentNavigation().extras.state.quizId;
      this.formTitle = 'Edit';
      this.getQuizDetails(id)
    }
  }


  ngOnInit(): void {
  }
  saveQuiz() {
    //  if (this.quiz.valid){
    // console.log(this.quiz.controls);
    this.finalQuizObj.quizName = this.quiz.controls.quizName.value;
    this.finalQuizObj.isActive = this.quiz.controls.isActive.value;
    this.finalQuizObj.description = this.quiz.controls.description.value;
    this.finalQuizObj.noOfQuestion = this.quiz.controls.noOfQuestion.value;
    this.finalQuizObj.totalMarks = this.quiz.controls.totalMarks.value;
    this.finalQuizObj.category = this.quiz.controls.category.value;
    if (this.finalQuizObj.quizName == null || this.finalQuizObj.isActive == null || this.finalQuizObj.noOfQuestion == null || this.finalQuizObj.totalMarks == null || this.finalQuizObj.category == null) {
      console.log("eeee",this.quiz.controls);
      return;
    }

    // console.log("finalQuizObj", this.finalQuizObj);
    this.apiCommomService.post("/quiz/", this.finalQuizObj).subscribe((res) => {
      console.log(res);

      Swal.fire("Well Done", res.message, "success");
      this.router.navigate(['admin/quizzes']);
    }, (error) => {
      console.log("error", error);

      Swal.fire("Error !!!", error.error.message, "error");
    })

  }
  getAllCategories() {
    this.apiCommomService.get("/category/").subscribe((res) => {
      this.categories = res;
    })
  }

  getQuizDetails(id: number) {


    this.apiCommomService.get("/quiz/" + id).subscribe((res) => {
      this.setQuizValues(res);
      // this.quiz = res
      // this.quiz.setControl = res
    }, (err) => {
      console.log("eror", err);
    });


  }
  public setQuizValues(res: any) {
    console.log("quiz", res);
    this.quiz.setValue({
      quizId: res.quizId,
      quizName: res.quizName,
      isActive: res.isActive,
      description: res.description,
      noOfQuestion: res.noOfQuestion,
      totalMarks: res.totalMarks,
      category: res.category
    })
    console.log("all categories ",this.categories);
    console.log("res.category    88",res.category);
    for (let i = 0; i < this.categories.length; i++) {
      let id = res.category.categoryId;
      if(id == this.categories[i].categoryId ){
        this.quiz.controls.category.setValue(this.categories[i])
      }
      
    }
    
    // this.quiz.controls.category.setValue(this.categories[0])

   


  }
  public updateQuiz() {
    // console.log("this.quiz.controls.category.value",this.quiz.controls.category.value);

    console.log("this.quiz.controls.category.value",this.quiz.controls.category.value);
    
    this.finalQuizObj.quizId = this.quiz.controls.quizId.value;
    this.finalQuizObj.quizName = this.quiz.controls.quizName.value;
    this.finalQuizObj.isActive = this.quiz.controls.isActive.value;
    this.finalQuizObj.description = this.quiz.controls.description.value;
    this.finalQuizObj.noOfQuestion = this.quiz.controls.noOfQuestion.value;
    this.finalQuizObj.totalMarks = this.quiz.controls.totalMarks.value;
    this.finalQuizObj.category = this.quiz.controls.category.value;
    if (this.finalQuizObj.quizName == null || this.finalQuizObj.isActive == null || this.finalQuizObj.noOfQuestion == null || this.finalQuizObj.totalMarks == null  ||this.finalQuizObj.category == null) {
      console.log(this.quiz.controls);
      console.log("null value");
      
      return;
    }

    // console.log("finalQuizObj", this.finalQuizObj);
    this.apiCommomService.put("/quiz/", this.finalQuizObj).subscribe((res) => {
      console.log(res);

      Swal.fire("Successful", res.message, "success");
      this.router.navigate(['admin/quizzes']);
    }, (error) => {
      console.log("error", error);

      Swal.fire("Error !!!", error.error.message, "error");
    })
  }




}
