import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Student} from '../models/student';
import {catchError, retry} from 'rxjs/operators';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  // Students Endpoint
  basePath = 'http://localhost:3000/api/profile';
  constructor(private http: HttpClient) { }
  // Http Default Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  // API Error Handling
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }
  // Create Student
  createItem(item): Observable<Student> {
    return this.http.post<Student>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Student by Id
  getItem(id): Observable<Student> {
    return this.http.get<Student>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  getProfile(): any{
    return this.http.get('https://offirent-open-source.herokuapp.com/swagger-ui/index.html?configUrl=/offirent-api-docs/swagger-config#/accounts/getAccountById/id?id=2');
  }
  // Get Student Data
  getList(): Observable<Student>{
    return this.http.get<Student>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update Student
  updateItem(id, item): Observable<Student>{
    return this.http.put<Student>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Student
  deleteItem(id): Observable<any> {
    return this.http.delete<Student>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
