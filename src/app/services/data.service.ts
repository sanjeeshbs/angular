
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
import { AppError } from '../common/app.error';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UnAuthorized } from '../common/un-authorized';

export class DataService {
  token: string;
  reqHeader: HttpHeaders;

  constructor(private url: string, private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token
    });
  }

  getResource<T>(id: string): Observable<T> {
    return this.http.get<T>(this.url + '/' + id, { headers: this.reqHeader })
      .pipe(
        catchError(this.handleError)
      );
  }lin

  getAll<T>(): Observable<T> {

    return this.http.get<T>(this.url, { headers: this.reqHeader })
      .pipe(
        catchError(this.handleError)
      );
  }

  create<T>(resource: any): Observable<T> {
    return this.http.post<T>(this.url, resource, { headers: this.reqHeader })
      .pipe(
        catchError(this.handleError)
      );
  }

  update<T>(id: string, resource: any) {
    return this.http.put<T>(this.url + '/' + id, resource, { headers: this.reqHeader })
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: string) {
    console.log(id);
    return this.http.delete(this.url + '/' + id, { headers: this.reqHeader })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(new NotFoundError());
    }
    else if (error.status === 400) {
      return throwError(new BadInput(error));
 }
    else if (error.status === 401) {
      return throwError(new UnAuthorized(error));
 }

    return throwError(new AppError(error));
  }
}
