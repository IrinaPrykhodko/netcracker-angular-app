import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error: ${err.error.message}`;
    } else {
      errorMessage = `Error status: ${err.status}`;

      if (err.status === 500) {
        alert('Sorry, try again later');
        errorMessage += (`\nMessage: ${err.message}`);
      } else if (err.status === 401) {
        console.log('401 error');
        this.authService.logout();
      }
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(this.handleError)
    );
  }
}
