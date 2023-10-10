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
  isSubmit = false
  totalQuestions = 0;
  totalCorrectAnswer = 0;
  totalmarksGot = 0;
  totalAttemptedQuestion = 0;
  notVisited = 0;
  fullMarks = 0;
  timer:any;

  constructor(private locatioSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _apiComService: ApiCommonService) { }

  ngOnInit(): void {
    this.preventBackButton()
    this.quizId = this._route.snapshot.params.quizId;
    this.getQuestionOfQuizId();

    //  this.questions.forEach((q) => {
    //   q['selectedAnswer'] = '';
    //  });

    console.log(this.questions);

  }
  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locatioSt.onPopState(() => {
      history.pushState(null, null, location.href);

    })

  }
  getQuestionOfQuizId() {
    this._apiComService.get("/question/quiz/limited/" + this.quizId).subscribe((data) => {
      data.forEach((q) => {
        q['selectedAnswer'] = ''
      })
      // this.timer = this.questions.length*120;
      this.questions = data;
      console.log(data);
      this.timer = data.length*120;
      this.startTimer()
    }, (error) => {
      Swal.fire("Error", "Somthing went worong", 'error')
    })
  }
  submitQuiz() {
    Swal.fire({
      title: "Do you want to submit the quiz?",
      showCancelButton: true,
      confirmButtonText: "Submit",
      denyButtonText: `Don't Submit`,
      icon: 'question'
    }).then((e) => {
      if (e.isConfirmed) {
        this.isSubmit = true
        this.totalQuestions = this.questions.length;
        this.questions.forEach(q => {
          if (q.selectedAnswer != '') {

            if (q.selectedAnswer == q.answer) {
              this.totalCorrectAnswer++;
            }
            this.totalAttemptedQuestion++;
          } else {
            this.notVisited++;
          }


        })
        this.fullMarks = this.questions[0].quiz.totalMarks;
        let marksPerQuestion = this.questions[0].quiz.totalMarks / this.questions.length;

        this.totalmarksGot = this.totalCorrectAnswer* marksPerQuestion;
        // console.log("Full Makrs:",this.fullMarks);
        // console.log("Total Marks: ",this.totalmarksGot);
        // console.log("Total Correct Answer:" , this.totalCorrectAnswer);
        // console.log("Total Attempted Question :", this.totalAttemptedQuestion);
        // console.log("Not Visited :",this.notVisited);
        



      }
    })
    // console.log(this.questions);

  }
  startTimer(){
   let t =  window.setInterval(()=>{
      if(this.timer<=0){
        clearInterval(t)
      }else{
        this.timer--;
        
      }
    },1000)
  }
  getFormatedTimer(){
    let hr = Math.floor(this.timer/3600)
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-(mm *60)
    return `${hr} hr : ${mm} min : ${ss} sec`
  }


}
