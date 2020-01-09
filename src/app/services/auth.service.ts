import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenSessionStorageKey = 'token';
  public redirectRoute = '/profile';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getCurrentUserToken(): string {
    return localStorage.getItem(this.tokenSessionStorageKey);
  }

  login(cred: User) {
    return this.http.post('http://localhost:8080/login', cred)
      .pipe(map(value => {
        console.log(this.redirectRoute);

        if (this.redirectRoute) {
          this.router.navigate([this.redirectRoute]);
          this.redirectRoute = null;
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
    console.log(this.getCurrentUserToken());
    localStorage.removeItem(this.tokenSessionStorageKey);
  }
}
