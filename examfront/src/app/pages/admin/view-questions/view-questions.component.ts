import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
 quizId;
 quizName;
 questions =[];
  constructor( private activatedRoute:ActivatedRoute,
    private comService:ApiCommonService,
    private router:Router) { 
      // console.log("this.router.getCurrentNavigation().extras.state.quizId;", this.router.getCurrentNavigation().extras.state.quizId);
        this.quizId = this.router.getCurrentNavigation().extras.state.quizId
        this.quizName = this.router.getCurrentNavigation().extras.state.quizName
    }

  ngOnInit(): void {
// this.quizId = this.activatedRoute.snapshot.params.quizId;
// this.quizName = this.activatedRoute.snapshot.params.quizName;
// console.log("id",this.quizId);
// console.log(this.quizName);
 this.getQuestionsByQuizId();

  }

getQuestionsByQuizId(){
this.comService.get("/question/quiz/"+this.quizId).subscribe((res)=>{
  // console.log("Questions are",res);
  this.questions= res;
})

  }
  navigateFunc() {
    
    this.router.navigate(['/admin/add-question'], {state: {quizId: this.quizId , quizName:this.quizName} })

  }
  deleteQuestion(questionId){


    Swal.fire({
      icon: 'question',
      title: 'Are you sure want to delete Quiz ?',
      text: "All the quizzes of this category will be deleted !",
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.comService.delete('/question/'+questionId).subscribe(
          (data) => {
            Swal.fire(
              'Good job!',
              data.message,
              'success',
            )
            this.getQuestionsByQuizId();
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
  

}
