import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Patient} from '../models/patient';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {
  }

  getPatient() {
    return this.http.get(`${environment.apiUrl}/account`);
  }

  editPatient(cred: Patient) {
    return this.http.put(`${environment.apiUrl}/account`, cred);
  }

  changePassword(cred: Patient) {
    return this.http.put(`${environment.apiUrl}/account/change-password`, cred);
  }
}


