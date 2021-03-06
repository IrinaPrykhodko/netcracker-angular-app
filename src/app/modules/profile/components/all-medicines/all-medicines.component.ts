import {Component, OnDestroy, OnInit} from '@angular/core';
import {Medicine} from '../../../../models/medicine';
import {PurchaseService} from '../../../../services/purchase.service';
import {PurchaseItem} from '../../../../models/purchase-item';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AddComponent} from '../medicine-kit/components/add/add.component';
import {SpinnerService} from '../../../../services/spinner.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {MedicineService} from '../../../../services/medicine.service';
import {AddMedicineToPurchasesComponent} from '../add-medicine-to-purchases/add-medicine-to-purchases.component';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-all-medicines',
  templateUrl: './all-medicines.component.html',
  styleUrls: ['./all-medicines.component.scss']
})
export class AllMedicinesComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  medicineList: Medicine[];
  selectedMedicine: Medicine;
  searchText: string;
  isSearching = false;
  public dialogRefEdit: MatDialogRef<AddComponent>;
  paginationOptions = {
    pageNumber: 0,
    size: 10,
  };
  public isSearchTextValid = true;
  public addMedicineToPurchaseRef: MatDialogRef<AddMedicineToPurchasesComponent>;

  constructor(private medicinesService: MedicineService,
              private purchaseService: PurchaseService,
              private spinnerService: SpinnerService,
              private dialog: MatDialog) {
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

  findMedicines(searchText: string) {
    this.searchText = searchText;
    this.spinnerService.setIsLoading(true);
    this.isSearching = true;
    this.medicineList.length = 0;
    this.paginationOptions.pageNumber = 0;

    this.getMedicines(this.searchText);
  }

  private getMedicines(searchText?: string) {
    this.medicinesService.getMedicines(this.paginationOptions.pageNumber, this.paginationOptions.size, searchText)
      .pipe(
        finalize(() => this.spinnerService.setIsLoading(false)),
        takeUntil(this.destroy$)
      )
      .subscribe((data: Medicine[]) => {
        this.medicineList = this.medicineList ? this.medicineList.concat(data) : data;
      });
  }

  addMedicineToKit() {
    console.log(this.selectedMedicine);
    this.dialogRefEdit = this.dialog.open(AddComponent, {
      data: {medicine: this.selectedMedicine},
    });
    // this.dialogRefEdit.beforeClosed()
    //   .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
    //   .subscribe((data: Medicine[]) => {
    //     this.medicineList = this.medicineList ? this.medicineList.concat(data) : data;
    //   });
  }

  addMedicineToPurchase() {
    const medicine = this.selectedMedicine;
    console.log('medicine for add to purchase ' + medicine);
    this.addMedicineToPurchaseRef = this.dialog.open(AddMedicineToPurchasesComponent, {
      data: {medicine}
    });
  }

  clearSearchText() {
    this.spinnerService.setIsLoading(true);
    this.searchText = undefined;
    this.medicineList.length = 0;
    this.paginationOptions.pageNumber = 0;
    this.isSearching = false;

    this.getMedicines();
  }

  validateSearchText(searchText: string) {
    if (searchText) {
      this.isSearchTextValid = /^[a-zA-Z0-9-]+$/.test(searchText);
    } else {
      this.isSearchTextValid = true;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
