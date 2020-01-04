import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MedicineInstance} from "../models/medicineInstance";

@Injectable({
  providedIn: 'root'
})
export class MedicineKitService {

  constructor(private http: HttpClient) { }

  getMedicineInstances(page: number, size: number) {
    return this.http.get('assets/medicine-kit.json?page=' + page + '&size=' + size);
  }

  addMedicineInstance(cred: MedicineInstance) {
    return this.http.post('https://med-kit.herokuapp.com/profile/medicine-kit', cred);
  }
  deleteMedicineInstance(id: number) {
    return this.http.put('https://med-kit.herokuapp.com/profile/medicine-kit', id);
  }

  editMedicineInstances(cred: MedicineInstance) {
    return this.http.put('https://med-kit.herokuapp.com/profile/medicine-kit', cred);  }
}
