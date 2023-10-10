import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  quizId;
  quiz:any;

  constructor( private _route:ActivatedRoute,private _apiComService:ApiCommonService,private router:Router) { }

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params.quizId;
    // console.log(this.quizId);
    
   this._apiComService.get("/quiz/"+this.quizId).subscribe((data)=>{
    // console.log(data);
    this.quiz = data;

    },(err)=>{
      Swal.fire("Error !!!",err.error.message,"error"
    )
    })

  }
  startQuiz(){
    Swal.fire({
      title: 'Do you want to Start the Quiz?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't start`,
      icon:'question'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
        console.log(this.quizId);
        
        this.router.navigate(['/start/'+this.quizId]);
      } 
    })
  }

}
