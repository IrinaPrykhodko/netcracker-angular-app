import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Prescription} from '../models/prescription';
import {environment} from '../../environments/environment';
import {AddPrescriptionRequest} from '../models/dto/add-prescription-request';
import {PrescriptionItem} from '../models/prescriptionItem';
import {AddPrescriptionItemRequest} from '../models/dto/add-prescription-item-request';

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

  deletePrescription(id: number) {
    const params = new HttpParams()
      .set('id', id.toString());

    return this.http.delete(`${environment.apiUrl}/prescriptions`, {params});
  }

  addPrescription(prescription: Prescription) {
    const request: AddPrescriptionRequest = {
      name: prescription.name,
      date: prescription.date,
      doctorId: this.defaultDoctorId
    };

    return this.http.post(`${environment.apiUrl}/prescriptions`, request);
  }

  addPrescriptionItem(prescriptionItem: PrescriptionItem) {
    const request: AddPrescriptionItemRequest = {
      prescriptionId: prescriptionItem.prescription.id,
      medicineId: prescriptionItem.medicine.id,
      startDate: prescriptionItem.startDate,
      endDate: prescriptionItem.endDate,
      takingDurationDays: prescriptionItem.takingDurationDays,
      takingTime: prescriptionItem.takingTime,
      description: prescriptionItem.description,
      dosage: prescriptionItem.dosage,
      isReminderEnabled: prescriptionItem.isReminderEnabled
    };

    return this.http.post(`${environment.apiUrl}/prescriptions/items`, request);
  }

  deletePrescriptionItem(prescriptionItemId: number) {
    return this.http.delete(`${environment.apiUrl}/prescriptions/items/${prescriptionItemId}`);
  }
}
