import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserTokenSubject: BehaviorSubject<string>;
  private currentUserToken: Observable<string>;
  private tokenKey = 'token';
  
  constructor(private http: HttpClient) {
    this.currentUserTokenSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem(this.tokenKey)));
    this.currentUserToken = this.currentUserTokenSubject.asObservable();
  }

  public get currentUserTokenValue(): string {
    return this.currentUserTokenSubject.value;
  }

  login(cred: User) {
    return this.http.post('https://med-kit.herokuapp.com/login', cred)
      .pipe(map(token => {
        console.log(`Raw token: ${token}`);
        const tokenAsString = JSON.stringify(token);
        console.log(`String token: ${tokenAsString}`);
        localStorage.setItem(this.tokenKey, tokenAsString);
        this.currentUserTokenSubject.next(tokenAsString);

        return tokenAsString;
      }));
  }

  logout() {
    console.log(this.currentUserTokenValue);
    localStorage.removeItem(this.tokenKey);
  }
}
