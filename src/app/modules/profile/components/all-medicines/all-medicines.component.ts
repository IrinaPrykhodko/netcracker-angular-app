import {Component, OnInit} from '@angular/core';
import {Medicine} from '../../../../models/medicine';
import {AllMedicinesService} from '../../../../services/all-medicines.service';
import {PurchaseService} from '../../../../services/purchase.service';
import {PurchaseItem} from '../../../../models/purchase-item';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AddComponent} from '../medicine-kit/components/add/add.component';
import {MedicineInstance} from '../../../../models/medicineInstance';

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
  public dialogRefEdit: MatDialogRef<AddComponent>;
  paginationOptions = {
    pageNumber: 0,
    size: 4,
  };

  constructor(private medicinesService: AllMedicinesService,
              private purchaseService: PurchaseService,
              private dialog: MatDialog) {
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

    if (requiredNumberOfMedicines >= this.medicineList.length - 1) {
      this.medicineList.pop();

      this.getMedicines(this.searchText);
    }
  }

  findMedicines() {
    this.isSearching = true;
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
  addMedicineToKit() {
    console.log(this.selectedMedicine);
    this.dialogRefEdit = this.dialog.open(AddComponent, {
      data: {medicine: this.selectedMedicine},
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
        alert('Purchase item created');
      }, error => {
        console.log(error);
      });
  }

  clearSearchText() {
    this.searchText = undefined;
    this.medicineList.length = 0;
    this.paginationOptions.pageNumber = 0;
    this.isSearching = false;

    this.getMedicines();
  }
}
