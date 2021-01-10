import { Injectable, Injector } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { MatDialog } from  '@angular/material/dialog';
import { environment } from '../environments/environment';
// import { environment } from '../environments/environment.prod';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './user';
// import { DialogErrorComponent } from './dialog-error/dialog-error.component';
// import { DialogEmailErrorComponent } from './dialog-email-error/dialog-email-error.component';
// import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient, public router: Router, private injector: Injector){ }

  redirectUrl: string;

  public get currentUserValue(): User {
        return this.currentUserSubject.value;
  }

  getStudents(): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/auth/getStudents`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getEditStudents(id: any): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/auth/getEditStudents?id=${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  studentDelete(id: any): Observable<any>{
    return this.httpClient.post(`${environment.apiUrl}/auth/studentDelete`, { studentId: id }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  studentInsert(user: User): Observable<any> {

    return this.httpClient.post(`${environment.apiUrl}/auth/studentInsert`, user).pipe(
        catchError(this.handleError)
    )
  }

  studentUpdate(user: User): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/auth/studentUpdate`, user).pipe(
        catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      msg = 'An error occurred:', error.error.message;
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      msg = 'Backend returned code ${error.status}, ` + `body was: ${error.error}'
    }
    return throwError(msg);
  }

}
