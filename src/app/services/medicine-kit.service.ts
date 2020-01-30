import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MedicineInstance} from '../models/medicineInstance';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicineKitService {

  constructor(private http: HttpClient) { }

  getMedicineInstances(page: number, size: number, searchText?: string): Observable<MedicineInstance[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (searchText) {
      params = params.set('query', searchText);
    }
    return this.http.get<MedicineInstance[]>(`${environment.apiUrl}/medicine-kit`, {params});
  }

  addMedicineInstance(cred: MedicineInstance) {
    return this.http.post(`${environment.apiUrl}/medicine-kit`, cred);
  }
  deleteMedicineInstance(id: number) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.delete(`${environment.apiUrl}/medicine-kit`, {params});
  }

  editMedicineInstance(cred: MedicineInstance) {
    return this.http.put(`${environment.apiUrl}/medicine-kit`, cred);  }
}
