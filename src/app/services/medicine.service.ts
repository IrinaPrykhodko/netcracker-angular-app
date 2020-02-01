import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Medicine} from '../models/medicine';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) {
  }

  getMedicines(page: number, size: number, searchText?: string): Observable<Medicine[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (searchText) {
      params = params.set('query', searchText);
    }

    return this.http.get<Medicine[]>(`${environment.apiUrl}/all-medicines/search-by-params`, {params});
  }
}
