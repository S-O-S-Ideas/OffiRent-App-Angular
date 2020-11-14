import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Office} from '../models/office';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDataOfficeService {
  basePath = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'})
  };
  handleError(error: HttpErrorResponse ): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error ocurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error} `);
    }
    return throwError('Something happened with request, please try again later.');
  }
  getOffice(id): Observable<Office>{
    return this.http.get<Office>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
