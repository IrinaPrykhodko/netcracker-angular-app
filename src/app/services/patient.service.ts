import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Patient} from '../models/patient';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private user = new BehaviorSubject(null);
  public user$ = this.user.asObservable();

  constructor(private http: HttpClient) {
  }

  getPatient() {
    return this.http.get(`${environment.apiUrl}/account`)
      .pipe(map(user => {
        this.user.next(user);
        return user;
      }));
  }

  editPatient(cred: Patient) {
    return this.http.put(`${environment.apiUrl}/account`, cred);
  }

  changePassword(cred: Patient) {
    return this.http.put(`${environment.apiUrl}/account/password`, cred);
  }
}


