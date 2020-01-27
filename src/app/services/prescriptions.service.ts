import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Prescription} from '../models/prescription';
import {AddPrescriptionData} from '../models/AddPrescriptionData';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {

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

  postPrescription(cred: AddPrescriptionData) {
    return this.http.post('assets/prescriptions.json', cred);
  }
}
