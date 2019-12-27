import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllMedicinesService {

  constructor(private http: HttpClient) { }

  getMedicines(page: number, size: number) {
    return this.http.get('assets/medicines.json?page=' + page + '&size=' + size);
  }
}
