import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  title: "Edit";
  quiz !: FormGroup;
  finalQuizObj:any={
    quizId: null,
    quizName: null,
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

  categories:any= []
  selectedCategory: any;
 



  constructor(private _fb: FormBuilder,
    private apiCommomService:ApiCommonService,
    private router:Router) {
    this.quiz = this._fb.group({
      quizId: null,
      quizName: null,
      isActive: null,
      description: null,
      noOfQuestion: null,
      totalMarks: null,
      category: {
        categoryId: null,
        categoryName: null,
        descriptions: null
      }


    })
    this.getAllCategories();
    

  }


  ngOnInit(): void {
  }
  saveQuiz() {
    console.log(this.quiz.controls);
    // let formData = new FormData();
    // formData.append("quizName",this.quiz.controls.quizName.value);
    // formData.append("isActive",this.quiz.controls.isActive.value);
    // formData.append("description",this.quiz.controls.description.value);
    // formData.append("noOfQuestion",this.quiz.controls.noOfQuestion.value);
    // formData.append("totalMarks",this.quiz.controls.totalMarks.value);
    // formData.append("category",this.quiz.controls.category.value);
    
    this.finalQuizObj.quizName = this.quiz.controls.quizName.value;
    this.finalQuizObj.isActive = this.quiz.controls.isActive.value;
    this.finalQuizObj.description = this.quiz.controls.description.value;
    this.finalQuizObj.noOfQuestion = this.quiz.controls.noOfQuestion.value;
    this.finalQuizObj.totalMarks = this.quiz.controls.totalMarks.value;
    this.finalQuizObj.category = this.quiz.controls.category.value;

    console.log("finalQuizObj",this.finalQuizObj);
    this.apiCommomService.post("/quiz/",this.finalQuizObj).subscribe((res)=>{
      console.log(res);
      
      Swal.fire("Well Done", res.message,"success");
      this.router.navigate(['admin/quizzes']);
    },(error)=>{
      console.log("error",error);
      
      Swal.fire("Error !!!", error.error.message,"error");
    })

  }
  getAllCategories(){
    this.apiCommomService.get("/category/").subscribe((res)=>{
      this.categories=res;
    })
  }
  

  
}
