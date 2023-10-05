import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from 'src/app/services/api-common.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {



quizzes:any = [];
  constructor(private comApiService:ApiCommonService) { }

  ngOnInit(): void {
    this.getQuizzes();
  }
  getQuizzes(){
    console.log("getting quizzes---");
    this.comApiService.get("/quiz/").subscribe((res)=>{
      console.log(res);
      
      this.quizzes = res;
    })
  }

}
