import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) {
  }

  email(cred: string) {
    return this.http.post(`${environment.apiUrl}/forgot-password`, cred);
  }
}
