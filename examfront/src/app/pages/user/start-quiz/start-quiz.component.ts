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
  totalPercentage;

  timer: any;
  totalTimeTaken: any;
  quizStartTime;
  quizEndTime;
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

    // console.log(this.questions);

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
      this.timer = data[0].quiz.totalTimeInMinute*60
      this.startTimer()
      this.quizStartTime = new Date();
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
        this.evaluetResult()
        // this.evaluateResult()


      }
    })
    // console.log(this.questions);

  }
  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        clearInterval(t)
        this.evaluetResult();
      } else {
        this.timer--;
      }
    }, 1000)
  }
  getFormatedTimer() {
    let hr = Math.floor(this.timer / 3600)
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - (mm * 60)
    return `${hr} hr : ${mm} min : ${ss} sec`
  }

  // evaluateResult() {

    



  //   this.totalQuestions = this.questions.length;
  //   this.questions.forEach(q => {
  //     if (q.selectedAnswer != '') {

  //       if (q.selectedAnswer == q.answer) {
  //         this.totalCorrectAnswer++;
  //       }
  //       this.totalAttemptedQuestion++;
  //     } else {
  //       this.notVisited++;
  //     }


  //   })
  //   this.fullMarks = this.questions[0].quiz.totalMarks;
  //   let marksPerQuestion = this.questions[0].quiz.totalMarks / this.questions.length;

  //   this.totalmarksGot = this.totalCorrectAnswer * marksPerQuestion;
  //   this.totalPercentage = (this.totalmarksGot / this.fullMarks) * 100;
    
  //   // console.log("Full Makrs:",this.fullMarks);
  //   // console.log("Total Marks: ",this.totalmarksGot);
  //   // console.log("Total Correct Answer:" , this.totalCorrectAnswer);
  //   // console.log("Total Attempted Question :", this.totalAttemptedQuestion);
  //   // console.log("Not Visited :",this.notVisited);

  // }

  getCurrentTime() {

    const currentDate = new Date();

    // Get the current time
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();


    console.log(currentHours);
    console.log(currentMinutes);
    console.log(currentSeconds);

    // Display the current time
    return (`${currentHours}:${currentMinutes}:${currentSeconds}`);
  }

  timeDuration(endTime, startTime) {
    const timeDifferenceMs = endTime - startTime;

    // Convert milliseconds to hours, minutes, and seconds
    const hours = Math.floor(timeDifferenceMs / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((timeDifferenceMs % 3600000) / 60000); // 1 minute = 60000 milliseconds
    const seconds = Math.floor(((timeDifferenceMs % 3600000) % 60000) / 1000); // 1 second = 1000 milliseconds
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }

  evaluetResult() {

    this.isSubmit = true

    this.quizEndTime = new Date;

    this._apiComService.post("/question/eval", this.questions).subscribe((res) => {
      // console.log("res", res);

      this.totalTimeTaken = this.timeDuration(this.quizEndTime, this.quizStartTime)
      this.fullMarks = res.fullMarks;
      this.totalmarksGot = res.totalMarksGained.toFixed(2);;
      this.totalPercentage = res.totalPercentage.toFixed(2);;
      this.totalCorrectAnswer =res.totalCorrectAnswer;
      this.notVisited = res.notVisited;
      this.totalAttemptedQuestion = res.totalAttempted;
      this.totalQuestions = res.totalNoOfQuestions;
      this.totalTimeTaken = this.timeDuration(this.quizEndTime, this.quizStartTime)

    }, (err) => {
      Swal.fire("Error", "Somthing went worong", 'error')
    })
  }

  printPage(){
    window.print();
  }

}
