import { Injectable } from '@angular/core';
import {Patient} from '../models/patient';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  checkToken(token: string) {
    return this.http.get(`${environment.apiUrl}/reset-password?token=` + token);
  }

  resetPassword(token: string, cred: string) {
    return this.http.post(`${environment.apiUrl}/reset-password?token=` + token, cred);
  }
}
