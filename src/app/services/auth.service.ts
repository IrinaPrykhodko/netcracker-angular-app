import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {PatientService} from './patient.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenSessionStorageKey = 'token';
  public redirectRoute = '/profile';

  constructor(private http: HttpClient,
              private router: Router,
              private patientService: PatientService) {
  }

  getCurrentUserToken(): string {
    return localStorage.getItem(this.tokenSessionStorageKey);
  }

  login(cred: User) {
    return this.http.post(`${environment.apiUrl}/login`, cred)
      .pipe(map((value: {token: string}) => {
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
}
