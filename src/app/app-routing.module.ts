import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component'
import { RegisterComponent } from './register/register.component'
import { EditStudentsComponent } from './edit-students/edit-students.component'

const routes: Routes = [
  { path: '', component: StudentComponent},
  { path: 'registration', component: RegisterComponent},
  { path: 'edit/:id', component: EditStudentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
