import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student_details = [];
  name: any;

  constructor(public authService: AuthService, public router: Router) {
    this.authService.getStudents().subscribe((res) => {
      if(res['success']){
        this.student_details = res['data']
      }
    }) 
   }

  ngOnInit(): void {
  }

  delete(id: any){
    this.authService.studentDelete(id).subscribe((res) => {
      if(res['success']){
        alert("Successfully Deleted")
        window.location.href = '';
      }
    })
  }
}
