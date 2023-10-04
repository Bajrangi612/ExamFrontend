import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
quizzes:any = [{
  quizName:"Java",
  isActive:true,
  description:"Java is a programming language and a platform. Java is a high level, robust, object-oriented and secure programming language. Java was developed by Sun ..",
  noOfQuestion:20,
  totalMarks:100,
  category:{
    catrgoryName:"Programming"
  }
},{
  quizName:"Java",
  isActive:true,
  description:"Java is a programming language and a platform. Java is a high level, robust, object-oriented and secure programming language. Java was developed by Sun ..",
  noOfQuestion:20,
  totalMarks:100,
  category:{
    catrgoryName:"Programming"
  }
},{
  quizName:"Java",
  isActive:true,
  description:"Java is a programming language and a platform. Java is a high level, robust, object-oriented and secure programming language. Java was developed by Sun ..",
  noOfQuestion:20,
  totalMarks:100,
  category:{
    catrgoryName:"Programming"
  }
}];
  constructor() { }

  ngOnInit(): void {
  }
  

}
