import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MedicineKitService} from '../../../../services/medicine-kit.service';
import {MedicineInstance} from '../../../../models/medicineInstance';
import {finalize, map} from 'rxjs/operators';
import {AddComponent} from './components/add/add.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {SpinnerService} from '../../../../services/spinner.service';

@Component({
  selector: 'app-medicine-kit',
  templateUrl: './medicine-kit.component.html',
  styleUrls: ['./medicine-kit.component.scss']
})
export class MedicineKitComponent implements OnInit {

  medicineKit: MedicineInstance[];
  public editForm: FormGroup;
  isSearching = false;
  public dialogRefEdit: MatDialogRef<AddComponent>;
  selectedMedicineInstance: MedicineInstance;
  paginationOptions = {
    pageNumber: 0,
    size: 10,
  };
  searchText: string;

  constructor(private medicineKitService: MedicineKitService,
              private formBuilder: FormBuilder,
              private spinnerService: SpinnerService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.spinnerService.setIsLoading(true);
    this.getMedicineInstances();
  }

  onSelected(medicineInstance: MedicineInstance): void {
    this.selectedMedicineInstance = medicineInstance;
    this.editForm = this.formBuilder.group({
      id: [this.selectedMedicineInstance.id],
      selfLife: [this.selectedMedicineInstance.selfLife, [Validators.required]],
      amount: [this.selectedMedicineInstance.amount, [Validators.required]]
    });
  }

  pageChange(p: number) {
    this.paginationOptions.pageNumber = p - 1;
    const requiredNumberOfMI = this.paginationOptions.pageNumber * this.paginationOptions.size;

    if (requiredNumberOfMI >= this.medicineKit.length - 1) {
      this.spinnerService.setIsLoading(true);
      this.medicineKit.pop();
      this.getMedicineInstances(this.searchText);
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
        })
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

  submit(selfLife: Date, amount: number) {
    this.spinnerService.setIsLoading(true);
    this.selectedMedicineInstance.amount = amount;
    this.selectedMedicineInstance.selfLife = selfLife;
    console.log(this.selectedMedicineInstance);
    this.medicineKitService.editMedicineInstance(this.selectedMedicineInstance)
      .pipe(finalize(() => {
        this.refresh();
      }))
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
      .pipe(finalize(() => {
        this.refresh();
      }))
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

}
