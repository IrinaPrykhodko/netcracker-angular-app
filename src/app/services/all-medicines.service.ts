import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Medicine} from '../models/medicine';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllMedicinesService {

  constructor(private http: HttpClient) {
  }

  getMedicines(page: number, size: number, searchText?: string): Observable<Medicine[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (searchText) {
      params = params.set('query', searchText);
    }

    console.log(params);

    return this.http.get<Medicine[]>('http://localhost:8080/all-medicines', {params});
  }
}
