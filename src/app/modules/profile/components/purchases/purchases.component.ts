import {Component, OnInit} from '@angular/core';
import {PurchaseService} from '../../../../services/purchase.service';
import {PurchaseItem} from '../../../../models/purchase-item';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SpinnerService} from '../../../../services/spinner.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {

  purchaseItems: PurchaseItem[];
  selectedPurchaseItem: PurchaseItem;
  editForm: FormGroup;
  isAmountInvalid: boolean;

  paginationOptions = {
    pageNumber: 0,
    size: 8
  };

  constructor(private purchaseService: PurchaseService,
              private formBuilder: FormBuilder,
              private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.setIsLoading(true);
    this.getPurchaseItems();
  }

  onSelected(purchaseItem: PurchaseItem) {
    this.selectedPurchaseItem = purchaseItem;

    this.editForm = this.formBuilder.group({
      id: [this.selectedPurchaseItem.id],
      amount: [this.selectedPurchaseItem.amount]
    });
  }

  changePage(p: number) {
    this.paginationOptions.pageNumber = p - 1;

    const requiredNumberOfPurchases = this.paginationOptions.pageNumber * this.paginationOptions.size;

    if (requiredNumberOfPurchases >= this.purchaseItems.length - 1) {
      this.spinnerService.setIsLoading(true);
      this.purchaseItems.pop();

      this.getPurchaseItems();
    }
  }

  editPurchaseItem(amount: number) {
    if (amount === undefined || amount < 0) {
      this.isAmountInvalid = true;
    } else {
      this.spinnerService.setIsLoading(true);
      this.selectedPurchaseItem.amount = amount;

      this.purchaseService.editPurchaseItem(this.selectedPurchaseItem)
        .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
        .subscribe(editedPurchaseItem => {
          console.log(editedPurchaseItem);

          this.ngOnInit();
        }, (error => {
          console.log(error);
        }));
    }
  }

  deletePurchaseItem(id: number) {
    this.spinnerService.setIsLoading(true);

    this.purchaseService.deletePurchaseItems([id])
      .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
      .subscribe(deletedPurchaseItem => {
        console.log(deletedPurchaseItem);

        this.ngOnInit();
      }, (error => {
        console.log(error);
      }));
  }

  buyPurchaseItems() {
    this.spinnerService.setIsLoading(true);
    const idList = this.purchaseItems.map(value => value.id);

    this.purchaseService.buyPurchaseItems(idList)
      .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
      .subscribe(approvedPurchaseIdList => {
        this.spinnerService.setIsLoading(true);
        this.purchaseService.deletePurchaseItems(approvedPurchaseIdList)
          .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
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
      .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
      .subscribe((data: PurchaseItem[]) => {
        this.purchaseItems = this.purchaseItems ? this.purchaseItems.concat(data) : data;
      });
  }
}
