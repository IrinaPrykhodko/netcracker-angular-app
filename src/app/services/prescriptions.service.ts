import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Prescription} from '../models/prescription';
import {AddPrescriptionData} from '../models/AddPrescriptionData';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {

  constructor(private http: HttpClient) { }

  getPrescriptions(page: number, size: number) {
    return this.http.get('assets/prescriptions.json?page=' + page + '&size=' + size);
  }
  getPrescriptionItems(page: number, size: number, prescriptionId: number) {
    return this.http.get('assets/prescriptionItems.json?page=' + page + '&size=' + size + '&id=' + prescriptionId);
  }

  deletePrescription(prescription: Prescription) {
    return this.http.delete('assets/prescriptions.json?id=' + prescription.id);

  }

  postPrescription(cred: AddPrescriptionData) {
    return this.http.post('assets/prescriptions.json', cred);
  }
}
