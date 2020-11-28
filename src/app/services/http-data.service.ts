import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Account} from '../models/account';
import {catchError, retry} from 'rxjs/operators';
import {Office} from '../models/office';
import {Reservation} from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  // Students Endpoint
  basePath = 'https://offirent-develop.herokuapp.com/api/';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  createItem(item): Observable<Account> {
    return this.http.post<Account>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getItem(id): Observable<Account> {
    return this.http.get<Account>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  updateItem(id, item): Observable<Account>{
    return this.http.put<Account>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Student

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  getProfile(): any{
    return this.http.get('https://offirent-develop.herokuapp.com/api/accounts/');
  }
  deleteProfile(): any {
    return this.http.delete('https://offirent-develop.herokuapp.com/api/accounts/');
  }
  getList(): Observable<Office>{
    return this.http.get<Office>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Student Data
  getListOffice(): Observable<Array<Office>>{
    return this.http.get<Array<Office>>(`${this.basePath}/offices`)
      .pipe(retry(2), catchError(this.handleError));
  }
  updateProfile( ): Observable<Account> {
    const editAccount = {
      firstName: 'Pablo',
      lastName: 'de los Backyardigans',
      email: 'pablo123@hotmail.com',
      password: 'pablo1234',
      identification: '72949109',
      phoneNumber: 987654321
    };
    // tslint:disable-next-line:max-line-length
    return this.http.put<Account> (`${this.basePath}/accounts/7`, JSON.stringify(editAccount), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAccount(id): Observable<Account> {
    return this.http.get<Account>(`${this.basePath}/accounts/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  deleteItem(id): Observable<any> {
    return this.http.delete<Account>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  deleteAccount(id): Observable<any> {
    return this.http.delete<Account>(`${this.basePath}/accounts/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  getListOfReservations(id): Observable<Array<Reservation>>{
    return this.http.get<Array<Reservation>>(`${this.basePath}/accounts/${id}/reservations`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createReservation(item): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.basePath}accounts/${item.AccountId}/Office=${item.OfficeId}/reservations`,
      JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  createOfficina(item): Observable<Office> {
    console.log(JSON.stringify(item));
    return this.http.post<Office>(`${this.basePath}accounts/${item.accountId}/District=${item.districtId}/offices`,
      JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  updateOfficina(id, item): Observable<Office>{
    console.log('aca se esta actulizando');
    console.log(JSON.stringify(item));
    return this.http.put<Office>(`${this.basePath}offices/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getOffice(id): Observable<Office> {
    return this.http.get<Office>(`${this.basePath}offices/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  deleteOffice(id): Observable<any> {
    return this.http.delete<Account>(`${this.basePath}offices/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  createAccount(item): Observable<Account> {
    return this.http.post<Account>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
