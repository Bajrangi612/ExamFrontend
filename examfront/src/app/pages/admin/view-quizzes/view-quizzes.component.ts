import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from 'src/app/services/api-common.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
quizzes:any = [];
  constructor(private apiCommonSer:ApiCommonService) { }

  ngOnInit(): void {
    this.getAllQuizzes();
  }

  public getAllQuizzes(){
    this.apiCommonSer.get("/quiz/").subscribe((res)=>{
      this.quizzes = res;
    })
  }
  

}
