import {Component, OnInit} from '@angular/core';
import {Medicine} from '../../../../models/medicine';
import {AllMedicinesService} from '../../../../services/all-medicines.service';
import {PurchaseService} from '../../../../services/purchase.service';
import {PurchaseItem} from '../../../../models/purchase-item';

@Component({
  selector: 'app-all-medicines',
  templateUrl: './all-medicines.component.html',
  styleUrls: ['./all-medicines.component.scss']
})
export class AllMedicinesComponent implements OnInit {

  medicineList: Medicine[];
  selectedMedicine: Medicine;
  searchText: string;

  paginationOptions = {
    pageNumber: 0,
    size: 4,
  };

  constructor(private medicinesService: AllMedicinesService,
              private purchaseService: PurchaseService) {
  }

  ngOnInit() {
    this.getMedicines();
  }

  onSelected(medicine: Medicine): void {
    this.selectedMedicine = medicine;
  }

  changePage(p: number) {
    this.paginationOptions.pageNumber = p - 1;
    const requiredNumberOfMedicines = this.paginationOptions.pageNumber * this.paginationOptions.size;

    console.log(`Page ${this.paginationOptions.pageNumber}`);
    console.log(`Need ${requiredNumberOfMedicines} medicines. Have ${this.medicineList.length}`);

    if (requiredNumberOfMedicines >= this.medicineList.length - 1) {
      this.medicineList.pop();

      this.getMedicines(this.searchText);
    }
  }

  findMedicines(searchText: string) {
    this.searchText = searchText;
    this.medicineList.length = 0;
    this.paginationOptions.pageNumber = 0;

    this.getMedicines(this.searchText);
  }

  private getMedicines(searchText?: string) {
    this.medicinesService.getMedicines(this.paginationOptions.pageNumber, this.paginationOptions.size, searchText)
      .subscribe((data: Medicine[]) => {
        this.medicineList = this.medicineList ? this.medicineList.concat(data) : data;
      });
  }

  addMedicineToPurchase(amount: number) {
    console.log(this.selectedMedicine);

    const purchaseItem: PurchaseItem = {
      amount,
      medicine: this.selectedMedicine
    };

    console.log(purchaseItem);

    this.purchaseService.addPurchaseItem(purchaseItem)
      .subscribe(value => {
        console.log(value);
      }, error => {
        console.log(error);
      });
  }

  clearSearchText() {
    this.searchText = undefined;
    this.medicineList.length = 0;
    this.paginationOptions.pageNumber = 0;

    this.getMedicines();
  }
}
