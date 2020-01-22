import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PurchaseItem} from '../models/purchase-item';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) {
  }

  getPurchaseItems(page: number, size: number): Observable<PurchaseItem[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PurchaseItem[]>(`${environment.apiUrl}/purchases`, {params});
  }

  editPurchaseItem(cred: PurchaseItem) {
    return this.http.put(`${environment.apiUrl}/purchases`, cred);
  }

  deletePurchaseItems(idList: number[]) {
    let params = new HttpParams();

    idList.forEach(value => {
      params = params.append('id', value.toString());
    });

    return this.http.delete(`${environment.apiUrl}/purchases`, {params});
  }

  buyPurchaseItems(id: number[]): Observable<number[]> {
    let params = new HttpParams();

    id.forEach(value => {
      params = params.append('id', value.toString());
    });

    return this.http.get<number[]>(`${environment.purchaseApiUrl}/buy`, {params});
  }

  addPurchaseItem(cred: PurchaseItem) {
    return this.http.post(`${environment.apiUrl}/purchases`, cred);
  }
}
