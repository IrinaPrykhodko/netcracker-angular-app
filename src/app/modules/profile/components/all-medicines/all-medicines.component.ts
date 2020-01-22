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
  paginationOptions = {
    pageNumber: 0,
    size: 20
  };
  searchText: string;

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
    this.paginationOptions.pageNumber = p;
    console.log(this.paginationOptions.pageNumber);
    this.getMedicines();
  }

  onSearch() {
    this.getMedicines(this.searchText);
  }

  private getMedicines(searchText?: string) {
    this.medicinesService.getMedicines(this.paginationOptions.pageNumber, this.paginationOptions.size, searchText)
      .subscribe((data: Medicine[]) => this.medicineList = data);
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
}
