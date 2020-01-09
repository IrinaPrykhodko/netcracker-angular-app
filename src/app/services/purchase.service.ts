import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PurchaseItem} from '../models/purchase-item';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) {
  }

  getPurchaseItems(page: number, size: number) {
    return this.http.get('assets/purchaseItems.json?page=' + page + '&size=' + size);
  }

  editPurchaseItem(cred: PurchaseItem) {
    return this.http.put('https://med-kit.herokuapp.com/profile/purchases', cred);
  }

  deletePurchaseItem(id: number) {
    return this.http.put('https://med-kit.herokuapp.com/purchases', id);
  }

  addPurchaseItem(cred: PurchaseItem) {
    return this.http.post('https://med-kit.herokuapp.com/purchases/add', cred);
  }
}
