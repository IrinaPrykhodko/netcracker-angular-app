import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MedicineKitService} from '../../../../services/medicine-kit.service';
import {MedicineInstance} from '../../../../models/medicineInstance';
import {finalize, map, takeUntil} from 'rxjs/operators';
import {SpinnerService} from '../../../../services/spinner.service';
import {Subject} from "rxjs";

@Component({
  selector: 'app-medicine-kit',
  templateUrl: './medicine-kit.component.html',
  styleUrls: ['./medicine-kit.component.scss']
})
export class MedicineKitComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  medicineKit: MedicineInstance[];
  public editForm: FormGroup;
  isSearching = false;
  selectedMedicineInstance: MedicineInstance;
  paginationOptions = {
    pageNumber: 0,
    size: 10,
  };
  searchText: string;
  isSearchTextValid = true;

  constructor(private medicineKitService: MedicineKitService,
              private formBuilder: FormBuilder,
              private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.setIsLoading(true);
    this.getMedicineInstances();
  }

  onSelected(medicineInstance: MedicineInstance): void {
    this.selectedMedicineInstance = medicineInstance;
  }

  pageChange(p: number) {
    this.paginationOptions.pageNumber = p - 1;
    const requiredNumberOfMI = this.paginationOptions.pageNumber * this.paginationOptions.size;

    if (requiredNumberOfMI >= this.medicineKit.length - 1) {
      if (this.isSearchTextValid) {
        this.spinnerService.setIsLoading(true);
        this.medicineKit.pop();
        this.getMedicineInstances(this.searchText);
      }
    }
  }

  private getMedicineInstances(searchText?: string) {
    this.medicineKitService.getMedicineInstances(this.paginationOptions.pageNumber, this.paginationOptions.size, searchText)
      .pipe(
        map((data: MedicineInstance[]) => {
          return data.map(item => this.checkDate(item));
        }),
        finalize(() => {
          this.spinnerService.setIsLoading(false);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data: MedicineInstance[]) => {
        this.medicineKit = this.medicineKit ? this.medicineKit.concat(data) : data;
      });
  }

  checkDate(item: any) {
    if (new Date(item.selfLife) < new Date()) {
      return {
        ...item,
        isExpired: true
      };
    } else {
      return {
        ...item,
        isExpired: false
      };
    }
  }

  onSearch() {
    console.log(this.searchText);
    this.spinnerService.setIsLoading(true);
    this.isSearching = true;
    this.medicineKit = null;
    this.paginationOptions.pageNumber = 0;
    this.getMedicineInstances(this.searchText);
  }

  submit(medicineInstance: MedicineInstance) {
    this.spinnerService.setIsLoading(true);
    console.log(medicineInstance);
    this.medicineKitService.editMedicineInstance({
      id: this.selectedMedicineInstance.id,
      ...medicineInstance,
      medicine: this.selectedMedicineInstance.medicine,
    })
      .pipe(
        finalize(() => { this.refresh(); }),
        takeUntil(this.destroy$)
      )
      .subscribe((userData) => {
        console.log(userData);

      }, (error => {
        console.log(error);
      }));
  }

  refresh() {
    this.medicineKit = null;
    this.paginationOptions.pageNumber = 0;
    this.getMedicineInstances();
  }

  delete(id: number) {
    this.spinnerService.setIsLoading(true);
    console.log(id);
    this.medicineKitService.deleteMedicineInstance(id)
      .pipe(finalize(() => { this.refresh(); }),
        takeUntil(this.destroy$)
        )
      .subscribe((userData) => {
        console.log(userData);
      }, (error => {
        console.log(error);
      }));
  }

  clearSearchText() {
    this.spinnerService.setIsLoading(true);
    this.searchText = undefined;
    this.medicineKit.length = 0;
    this.paginationOptions.pageNumber = 0;
    this.isSearching = false;

    this.getMedicineInstances();
  }

  validateSearchText() {
    if (this.searchText) {
      this.isSearchTextValid = /^[a-zA-Z0-9-]+$/.test(this.searchText);
    } else {
      this.isSearchTextValid = true;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
