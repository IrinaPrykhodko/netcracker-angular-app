import {Component, OnInit} from '@angular/core';
import {PurchaseService} from '../../../../services/purchase.service';
import {PurchaseItem} from '../../../../models/purchase-item';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SpinnerService} from '../../../../services/spinner.service';
import {finalize} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

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
    size: 8
  };

  constructor(private purchaseService: PurchaseService,
              private formBuilder: FormBuilder,
              private spinnerService: SpinnerService,
              private toast: ToastrService) {
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
    this.spinnerService.setIsLoading(true);
    this.selectedPurchaseItem.amount = amount;

    this.purchaseService.editPurchaseItem(this.selectedPurchaseItem)
      .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
      .subscribe((editedPurchaseItem: PurchaseItem) => {
        console.log(editedPurchaseItem);

        this.purchaseItems = this.purchaseItems.map(value => {
          return value.id === editedPurchaseItem.id ? editedPurchaseItem : value;
        });
      }, (error => {
        console.log(error);
      }));
  }

  deletePurchaseItem(id: number) {
    this.spinnerService.setIsLoading(true);

    this.purchaseService.deletePurchaseItems([id])
      .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
      .subscribe(deletedPurchaseItem => {
        console.log(deletedPurchaseItem);

        this.purchaseItems = this.purchaseItems.filter(item => item.id !== id);
      }, (error => {
        console.log(error);
      }));
  }

  buyPurchaseItems() {
    this.spinnerService.setIsLoading(true);
    const idList = this.purchaseItems.map(value => value.id);

    this.purchaseService.buyPurchaseItems(idList)
      .subscribe(approvedPurchaseIdList => {
        this.purchaseService.deletePurchaseItems(approvedPurchaseIdList)
          .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
          .subscribe(value => {
            this.purchaseItems = this.purchaseItems.filter(item => {
              return !approvedPurchaseIdList.includes(item.id);
            });

            this.toast.success('Purchase items successfully bought!', 'Buy purchase items');
          }, error => {
            this.toast.error('Could not remove bought purchase items, please try again', 'Buy purchase items');
            console.log(error);
          });
      }, error => {
        this.spinnerService.setIsLoading(false);
        this.toast.error('Could not buy purchase items, please try again', 'Buy purchase items');
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
