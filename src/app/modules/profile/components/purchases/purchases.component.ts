import {Component, OnInit} from '@angular/core';
import {PurchaseService} from '../../../../services/purchase.service';
import {PurchaseItem} from '../../../../models/purchase-item';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {

  purchaseItems: PurchaseItem[];
  selectedPurchaseItem: PurchaseItem;
  editForm: FormGroup;
  searchText: string;

  paginationOptions = {
    pageNumber: 0,
    size: 8
  };

  constructor(private purchaseService: PurchaseService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.purchaseService.getPurchaseItems(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .subscribe((data: PurchaseItem[]) => this.purchaseItems = data);
  }

  onSelected(purchaseItem: PurchaseItem) {
    this.selectedPurchaseItem = purchaseItem;

    this.editForm = this.formBuilder.group({
      id: [this.selectedPurchaseItem.id],
      amount: [this.selectedPurchaseItem.amount]
    });
  }

  onSearch() {
    console.log(this.searchText);
  }

  pageChange(p: number) {
    this.paginationOptions.pageNumber = p;

    console.log(this.paginationOptions.pageNumber);

    this.purchaseService.getPurchaseItems(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .subscribe((data: PurchaseItem[]) => this.purchaseItems = data);
  }

  submit() {
    console.log(this.editForm.value);

    this.purchaseService.editPurchaseItem(this.editForm.value)
      .subscribe(editedPurchaseItem => {
        console.log(editedPurchaseItem);
      }, (error => {
        console.log(error);
      }));
  }

  delete(id: number) {
    console.log(id);

    this.purchaseService.deletePurchaseItem(id)
      .subscribe(deletedPurchaseItem => {
        console.log(deletedPurchaseItem);
      }, (error => {
        console.log(error);
      }));
  }
}
