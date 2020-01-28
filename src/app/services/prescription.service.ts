import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Prescription} from '../models/prescription';
import {environment} from '../../environments/environment';
import {AddPrescriptionRequest} from '../models/dto/add-prescription-request';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  public defaultDoctorId = 4;

  constructor(private http: HttpClient) {
  }

  getPrescriptions(page: number, size: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get(`${environment.apiUrl}/prescriptions`, {params});
  }

  getPrescriptionItems(prescriptionId: number) {
    return this.http.get(`${environment.apiUrl}/prescriptions/${prescriptionId}/items`);
  }

  deletePrescription(prescription: Prescription) {
    return this.http.delete('assets/prescriptions.json?id=' + prescription.id);

  }

  addPrescription(prescription: Prescription) {
    const request: AddPrescriptionRequest = {
      name: prescription.name,
      date: prescription.date,
      doctorId: this.defaultDoctorId
    };
    return this.http.post(`${environment.apiUrl}/prescriptions`, request);
  }
}
