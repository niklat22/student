import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.css']
})
export class EditStudentsComponent implements OnInit {
  studentEditForm: FormGroup;
  name: any;
  roll_no: any;
  s_class: any;
  standard: any;
  city: any;
  studentId: any;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    let param_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getEditStudents(param_id).subscribe((res) => {
      if(res['success']){
        this.name = res['data']['name']
        this.roll_no = res['data']['roll_no']
        this.s_class = res['data']['s_class']
        this.standard = res['data']['standard']
        this.city = res['data']['city']
      }
    })
    
    this.studentEditForm = this.formBuilder.group({
      name: [this.name],
      roll_no: [this.roll_no],
      s_class: [this.s_class],
      standard: [this.standard],
      city: [this.city],
    })

   }

  ngOnInit(): void {
  }

  updateStudent(){
    this.studentEditForm.value.studentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.studentEditForm.value.name = (this.studentEditForm.value.name !== null) ? this.studentEditForm.value.name : this.name
    this.studentEditForm.value.roll_no = (this.studentEditForm.value.roll_no !== null) ? this.studentEditForm.value.roll_no : this.roll_no
    this.studentEditForm.value.s_class = (this.studentEditForm.value.s_class !== null) ? this.studentEditForm.value.s_class : this.s_class
    this.studentEditForm.value.standard = (this.studentEditForm.value.standard !== null) ? this.studentEditForm.value.standard : this.standard
    this.studentEditForm.value.city = (this.studentEditForm.value.city !== null) ? this.studentEditForm.value.city : this.city

    this.authService.studentUpdate(this.studentEditForm.value).subscribe((res) => {
      if(res['success']){
        alert('Successfully Update')
        this.router.navigate(['']);
      }
    })
  }

  close() {
    this.router.navigate(['']);
  }
}
