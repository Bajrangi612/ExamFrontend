import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor(private apiComService:ApiCommonService,
    private router: Router) { 
    this.getAllCateories()
  }

  ngOnInit(): void {

  }
  categories  =[];
  catId

  getAllCateories(){
    this.apiComService.get("/category/").subscribe((data)=>{
    this.categories = data
    },(error)=>{
      Swal.fire("Error",error.error.message,'error')
      
    })
  }




}
