import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetPurchaseItemsResponse} from '../models/get-purchase-items-response';

@Injectable({
  providedIn: 'root'
})
export class PurchaseServiceService {

  constructor(private http: HttpClient) { }

  getPurchaseItems(page: number, size: number) {
    return this.http.get<GetPurchaseItemsResponse>('http://localhost:8080/profile/purchases');
  }
}
