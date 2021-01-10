import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profileForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) { 
    this.profileForm = this.formBuilder.group({
      name: [''],
      roll_no: [''],
      s_class: [''],
      standard: [''],
      city: [''],
    })
  }

  get formControls() { return this.profileForm.controls }

  ngOnInit(): void {
  }

  updateProfile() {
    this.authService.studentInsert(this.profileForm.value).subscribe((res) => {
      if(res['success']){
        this.router.navigate(['']);
        alert('Student succesfully created')
      }
    })
  }
}
