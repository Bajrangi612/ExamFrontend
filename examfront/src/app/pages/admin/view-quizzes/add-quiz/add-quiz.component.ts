import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  quiz !: FormGroup;


  constructor( private _fb: FormBuilder) { 
    this.quiz= this._fb.group({
      quizId:null,
      quizName:null,
      isActive:null,
      description:null,
      noOfQuestion:null,
      totalMarks:null,
      category:[{
        categoryId:null,
        categoryName:null,
        descriptions:null
      }]
      

    })

    }
  

  ngOnInit(): void {
  }
 
  onFormSubmit(){
    console.log(this.quiz.controls.quizName.value);
    
  }

}
