import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;

  quizId: string;
  quizName: string;
  questions = {
    quiz: {},
    content: '',
    answer: '',
    options: []
  }
  allOptions: any = []

  constructor(private _router: ActivatedRoute,
    private _apiComservice: ApiCommonService,
    private router: Router) {
    this.quizId = this.router.getCurrentNavigation().extras.state.quizId
    this.quizName = this.router.getCurrentNavigation().extras.state.quizName
  }

  ngOnInit(): void {
    // console.log("this.router.getCurrentNavigation().extras.state.quizId;", this.router.getCurrentNavigation());
    // this.quizId = this.router.getCurrentNavigation().extras.state.quizId
    // this.quizName = this.router.getCurrentNavigation().extras.state.qName

    // console.log('quiz id is ::: '+this.quizId);
    this.questions.quiz['quizId'] = this.quizId;
  }
  addQuestion() {
  

    // this.allOptions.push(1);
    this.allOptions.forEach(element => {
      let arr = {
        optionContent: element
      }
      this.questions.options.push(arr);
    });
    if (this.questions.answer == '' || this.questions.content == '' || this.questions.options.length == 0) {
      // console.log("somthing is null");

      return
    }
    // this.questions.options.option = 
    console.log("question are -- ", this.questions);
    this._apiComservice.post("/question/", this.questions).subscribe((data) => {
      Swal.fire(
        'Good job!',
        data.message,
        'success',
      );


      // console.log("quizId and quiz name is --", this.quizId, this.quizName);

      this.router.navigate(['/admin/questions'], { state: { quizId: this.quizId, quizName: this.quizName } })
    }, (err) => {
      Swal.fire(
        'Error!',
        err.error.message,
        'error',
      )
    })
  }




}
