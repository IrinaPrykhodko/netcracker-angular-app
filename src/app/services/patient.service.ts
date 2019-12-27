import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Patient} from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {
  }

  getPatient() {
    return this.http.get('https://med-kit.herokuapp.com/profile/account');
  }

  editPatient(cred: Patient) {
    return this.http.put('https://med-kit.herokuapp.com/profile/edit', cred);
  }

  changePassword(cred: Patient) {
    return this.http.put('https://med-kit.herokuapp.com/profile/change-password', cred);
  }

}


