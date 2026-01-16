import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable, map, throwError } from 'rxjs';
import { projectData } from './projectData.model';
import { catchError } from 'rxjs/operators';
import { RegisterData, LoginData } from './Model/loginData.model';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  isLoginError = new EventEmitter<boolean>(false)
  URL = "http://localhost:3000";
  statusData: any;

  constructor(private http: HttpClient, private router: Router) { }

  // to check is user valid or not
  userLogIn(data: LoginData) {
    return this.http
      .get<any>(`http://localhost:3000/userData?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .pipe(catchError(this.handleError))
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          this.router.navigate(['dashboard']);
        } else {
          this.isLoginError.emit(true);
        }
      }
      );
  }

  // to pilot user login data
  addUser(data:RegisterData){
    return this.http.post<RegisterData>(this.URL + '/userData', data )
  }

  //  to add new project
  addProject(data: projectData): Observable<any> {
    return this.http.post<projectData>(`${this.URL}/projectData`, data)
  }

  // to get project list
  getProjectList(): Observable<any> {
    return this.http.get<any>(`${this.URL}/projectData`)
  }

  // getProjectById(id:number){
  //   return this.http.get<any>(`${this.URL}/projectData/${id}`)
  // }

  // to update status of project
  updateProject(data: projectData, id: number): Observable<any> {
    return this.http.put<projectData>(`${this.URL}/projectData/${id}`, data)
  }



  // to show the count of status on dashboard 
  getStatusData(): Observable<any> {
    return this.http.get<any>(`${this.URL}/projectData`)
      .pipe(map((res: any) => {
        let names = res.map((item: any) => item.status);
        const occurrences = names.reduce((acc: any, curr: any) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        }, {});
        return { occurrences };
      }))
  }

  // to pass the changed status
  updateStatusData(id: number, allStatusData: any, previousStatus: string, currentStatus: string): Observable<any> {
    const _StatusData = [...allStatusData];
    const body = { _StatusData, statusUpdate: `${previousStatus}, ${currentStatus}` };
    let _previousStatusValue = _StatusData[0].previousStatus;
    let _currentStatusValue = _StatusData[0].currentStatus;
    _previousStatusValue--;
    _currentStatusValue++;
    return this.http.put<any>(`${this.URL}/statusData/${id}`, body)
  }

  // Delete Project
  // deleteProject(id: number): Observable<any> {
  //   return this.http.delete<any>(`${this.URL}/projectDat/${id}`)
  // }

  // to pass error
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error: ', errorResponse.error.message)
    }
    //  else {
    //   alert(`Server Side error : ${JSON.stringify(errorResponse.message)}`);
    // }
    return throwError("Something went wrong");
  }

}


