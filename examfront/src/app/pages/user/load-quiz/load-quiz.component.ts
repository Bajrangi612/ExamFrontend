import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  constructor(private router: Router, private _atRoute: ActivatedRoute,
    private apiComService: ApiCommonService) {
    console.log('loading construstor');

    // if (this.router.getCurrentNavigation().extras.state != null) {
    //   console.log("this.router.getCurrentNavigation().extras.state.quizId;", this.router.getCurrentNavigation().extras.state.categoryId);
    //   let id = this.router.getCurrentNavigation().extras.state.categoryId;
    //   console.log("cat id --",id);

    // }else{
    //   console.log("this.router.getCurrentNavigation().extras.state.quizId;", this.router.getCurrentNavigation().extras.state);
    // }
  }
  categoryId;
  quizzes;

  ngOnInit(): void {

    this.categoryId = this._atRoute.snapshot.params.categoryId;
    if (this.categoryId == 0) {
      console.log('load all quizes');
      this.apiComService.get("/quiz/").subscribe((data) => {
        this.quizzes = data
      }, (err) => {
          Swal.fire('Error !!',err.error.message,'error')
      }
      )
    } else {
      console.log('load specfic quizzes');

    }

  }



}
