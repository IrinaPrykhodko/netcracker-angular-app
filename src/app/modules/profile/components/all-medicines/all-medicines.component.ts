import {Component, OnInit} from '@angular/core';
import {Medicine} from '../../../../models/medicine';
import {MedicineService} from '../../../../services/medicine.service';
import {PurchaseService} from '../../../../services/purchase.service';
import {PurchaseItem} from '../../../../models/purchase-item';
import {SpinnerService} from '../../../../services/spinner.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-all-medicines',
  templateUrl: './all-medicines.component.html',
  styleUrls: ['./all-medicines.component.scss']
})
export class AllMedicinesComponent implements OnInit {

  medicineList: Medicine[];
  selectedMedicine: Medicine;
  searchText: string;
  isSearching = false;

  paginationOptions = {
    pageNumber: 0,
    size: 4,
  };

  constructor(private medicinesService: MedicineService,
              private purchaseService: PurchaseService,
              private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.setIsLoading(true);
    this.getMedicines();
  }

  onSelected(medicine: Medicine): void {
    this.selectedMedicine = medicine;
  }

  changePage(p: number) {
    this.paginationOptions.pageNumber = p - 1;
    const requiredNumberOfMedicines = this.paginationOptions.pageNumber * this.paginationOptions.size;

    if (requiredNumberOfMedicines >= this.medicineList.length - 1) {
      this.spinnerService.setIsLoading(true);
      this.medicineList.pop();

      this.getMedicines(this.searchText);
    }
  }

  findMedicines() {
    this.spinnerService.setIsLoading(true);
    this.isSearching = true;
    this.medicineList.length = 0;
    this.paginationOptions.pageNumber = 0;

    this.getMedicines(this.searchText);
  }

  private getMedicines(searchText?: string) {
    this.medicinesService.getMedicines(this.paginationOptions.pageNumber, this.paginationOptions.size, searchText)
      .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
      .subscribe((data: Medicine[]) => {
        this.medicineList = this.medicineList ? this.medicineList.concat(data) : data;
      });
  }

  addMedicineToPurchase(amount: number) {
    this.spinnerService.setIsLoading(true);

    const purchaseItem: PurchaseItem = {
      amount,
      medicine: this.selectedMedicine
    };

    this.purchaseService.addPurchaseItem(purchaseItem)
      .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
      .subscribe(value => {
        console.log(value);
        alert('Purchase item created');
      }, error => {
        console.log(error);
      });
  }

  clearSearchText() {
    this.spinnerService.setIsLoading(false);
    this.searchText = undefined;
    this.medicineList.length = 0;
    this.paginationOptions.pageNumber = 0;
    this.isSearching = false;

    this.getMedicines();
  }
}
