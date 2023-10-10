import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  quizId;
  questions;
  constructor( private locatioSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _apiComService:ApiCommonService) { }

  ngOnInit(): void {
    this.preventBackButton()
   this.quizId =  this._route.snapshot.params.quizId;
   this.getQuestionOfQuizId()
  }
  preventBackButton(){
    history.pushState(null,null,location.href);
    this.locatioSt.onPopState(()=>{
    history.pushState(null,null,location.href);
      
    })

  }
  getQuestionOfQuizId(){
    this._apiComService.get("/question/quiz/limited/"+this.quizId).subscribe((data)=>{
      console.log(data);
      this.questions = data;
      
    },(error)=>{
      Swal.fire("Error","Somthing went worong",'error')
    })
  }

}
