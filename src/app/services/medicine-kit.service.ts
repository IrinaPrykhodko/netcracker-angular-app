import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicineKitService {

  constructor(private http: HttpClient) { }

  getMedicineInstances(page: number, size: number) {
    return this.http.get('assets/medicine-kit.json?page=' + page + '&size=' + size);
  }
}
