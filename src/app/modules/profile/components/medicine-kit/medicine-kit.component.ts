import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MedicineKitService} from '../../../../services/medicine-kit.service';
import {MedicineInstance} from '../../../../models/medicineInstance';
import {map} from 'rxjs/operators';
import {AddComponent} from './components/add/add.component';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-medicine-kit',
  templateUrl: './medicine-kit.component.html',
  styleUrls: ['./medicine-kit.component.scss']
})
export class MedicineKitComponent implements OnInit {

  medicineKit: MedicineInstance[];
  public editForm: FormGroup ;
  public dialogRefEdit: MatDialogRef<AddComponent>;
  selectedMedicineInstance: MedicineInstance;
  paginationOptions = {
    pageNumber: 0,
    size: 8
  };
  searchText: string;

  constructor(private medicineKitService: MedicineKitService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.medicineKitService.getMedicineInstances(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .pipe(map((data: MedicineInstance[]) => {
        return data.map(item => this.checkDate(item));
      }))
      .subscribe((data: MedicineInstance[]) => this.medicineKit = data);
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
    console.log(this.paginationOptions.pageNumber);
    this.medicineKitService.getMedicineInstances(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .pipe(map((data: MedicineInstance[]) => {
        return data.map(item => this.checkDate(item));
      }))
      .subscribe((data: MedicineInstance[]) => this.medicineKit = data);
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
  }

  submit(selfLife: Date, amount: number) {
    console.log(this.editForm.value);
    this.selectedMedicineInstance.amount = amount;
    this.selectedMedicineInstance.selfLife = selfLife;
    this.medicineKitService.editMedicineInstance(this.selectedMedicineInstance)
      .subscribe((userData) => {
        console.log(userData);
      }, (error => {
        console.log(error);
      }));
  }

  delete(id: number) {
    console.log(id);
    this.medicineKitService.deleteMedicineInstance(id)
      .subscribe((userData) => {
        console.log(userData);
      }, (error => {
        console.log(error);
      }));
  }

}
