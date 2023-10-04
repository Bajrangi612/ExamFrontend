import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
categories = [{
  categoryId:10,
  categoryName:"Programming1",
  description:" this description is for testing only"
},
{
  categoryId:10,
  categoryName:"Programming2",
  description:" this description is for testing only"
},{
  categoryId:10,
  categoryName:"Programming3",
  description:" this description is for testing only"
},{
  categoryId:10,
  categoryName:"Programming4",
  description:" this description is for testing only"
}]
  constructor() { }

  ngOnInit(): void {
  }

}
