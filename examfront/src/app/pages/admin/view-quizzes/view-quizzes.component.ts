import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})



export class ViewQuizzesComponent implements OnInit {
  quizzes: any = [];
  constructor(private apiCommonSer: ApiCommonService,
    private router:Router) {
  }

  ngOnInit(): void {
    this.getAllQuizzes();
   
  }

  public getAllQuizzes() {
    this.apiCommonSer.get("/quiz/").subscribe((res) => {
      this.quizzes = res;
    })
  }
  deleteQuiz(id){
    this.apiCommonSer.delete("/quiz/"+id).subscribe((res)=>{
     
      Swal.fire("Well Done", res.message, "success");
      this.getAllQuizzes();
    }, (error) => {
      console.log("error", error);
      Swal.fire("Error !!!", error.error.message, "error"); 
      this.getAllQuizzes();
    })
  }



}
