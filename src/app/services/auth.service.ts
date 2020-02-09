import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {PatientService} from './patient.service';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenSessionStorageKey = 'token';
  public redirectRoute = '/profile';

  constructor(private http: HttpClient,
              private router: Router,
              private patientService: PatientService,
              private toast: ToastrService) {
  }

  getCurrentUserToken(): string {
    return localStorage.getItem(this.tokenSessionStorageKey);
  }

  login(cred: User) {
    return this.http.post(`${environment.apiUrl}/login`, cred)
      .pipe(map((value: { token: string }) => {
        console.log(this.redirectRoute);

        if (value.token) {
          this.setUserToken(value.token);
          this.router.navigate([this.redirectRoute]);
        }

        return value;
      }));
  }

  isUserLoggedIn(): boolean {
    return this.getCurrentUserToken() !== null;
  }

  setUserToken(token: string) {
    localStorage.setItem(this.tokenSessionStorageKey, token);
  }

  logout() {
    localStorage.removeItem(this.tokenSessionStorageKey);
    this.patientService.setPatient(null);
    this.router.navigate(['/login']);
  }

  checkIsTokenExpired() {
    const token = this.getCurrentUserToken();

    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const tokenExpirationTime = moment(decodedToken.exp * 1000);
      console.log(tokenExpirationTime);

      if (tokenExpirationTime.isBefore(moment())) {
        this.toast.info('Your token is expired. Please login again');
        this.logout();
      }
    }
  }
}
