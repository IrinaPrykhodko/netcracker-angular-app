import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Patient} from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getPatient() {
    return this.http.get('assets/patient.json');
  }

  editPatient(cread: Patient) {
    return this.http.post('assets/patient.json', cread);
  }
}
