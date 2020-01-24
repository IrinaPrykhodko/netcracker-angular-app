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

  paginationOptions = {
    pageNumber: 0,
    size: 20
  };

  constructor(private purchaseService: PurchaseService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getPurchaseItems();
  }

  onSelected(purchaseItem: PurchaseItem) {
    this.selectedPurchaseItem = purchaseItem;

    this.editForm = this.formBuilder.group({
      id: [this.selectedPurchaseItem.id],
      amount: [this.selectedPurchaseItem.amount]
    });
  }

  onSearch(searchText: string) {
    console.log(searchText);
  }

  changePage(p: number) {
    this.paginationOptions.pageNumber = p;

    console.log(this.paginationOptions.pageNumber);

    this.getPurchaseItems();
  }

  editPurchaseItem(amount: number) {
    this.selectedPurchaseItem.amount = amount;

    this.purchaseService.editPurchaseItem(this.selectedPurchaseItem)
      .subscribe(editedPurchaseItem => {
        console.log(editedPurchaseItem);

        this.ngOnInit();
      }, (error => {
        console.log(error);
      }));
  }

  deletePurchaseItem(id: number) {
    console.log(id);

    this.purchaseService.deletePurchaseItems([id])
      .subscribe(deletedPurchaseItem => {
        console.log(deletedPurchaseItem);

        this.ngOnInit();
      }, (error => {
        console.log(error);
      }));
  }

  buyPurchaseItems() {
    const idList = this.purchaseItems.map(value => value.id);

    console.log('Buy: ' + idList);

    this.purchaseService.buyPurchaseItems(idList)
      .subscribe(approvedPurchaseIdList => {
        console.log('Bought: ' + approvedPurchaseIdList);
        this.purchaseService.deletePurchaseItems(approvedPurchaseIdList)
          .subscribe(value => {
            alert('Purchase items successfully bought!');

            this.ngOnInit();
          }, error => {
            alert('Could not remove bought purchase items. Try again');
            console.log(error);
          });

      }, error => {
        alert('Could not buy purchase items. Try again');
        console.log(error);
      });
  }

  private getPurchaseItems() {
    this.purchaseService.getPurchaseItems(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .subscribe((data: PurchaseItem[]) => this.purchaseItems = data);
  }
}
