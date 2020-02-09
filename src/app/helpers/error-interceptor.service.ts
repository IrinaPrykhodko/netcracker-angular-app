import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMessage: string;

        if (err.error instanceof ErrorEvent) {
          errorMessage = `Error: ${err.error.message}`;
        } else {
          errorMessage = `Error status: ${err.status}`;

          if (err.status === 500) {
            console.log(`Sorry, try again later. ${err.error.message}`);
            errorMessage += (`\nMessage: ${err.message}`);
          } else if (err.status === 401 || err.status === 403) {
            this.authService.redirectRoute = this.router.url;
            this.router.navigate(['/login']);
          }
        }

        console.log(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
