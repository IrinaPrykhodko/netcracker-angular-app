import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PrescriptionItem} from '../../../../../../models/prescriptionItem';
import {Prescription} from '../../../../../../models/prescription';
import {Medicine} from '../../../../../../models/medicine';
import {MedicineService} from '../../../../../../services/medicine.service';
import {delay, finalize} from 'rxjs/operators';
import {PrescriptionService} from '../../../../../../services/prescription.service';

@Component({
  selector: 'app-add-prescription-item',
  templateUrl: './add-prescription-item.component.html',
  styleUrls: ['./add-prescription-item.component.scss']
})
export class AddPrescriptionItemComponent implements OnInit {

  private addItemForm: FormGroup;
  private prescriptionItem: PrescriptionItem = new PrescriptionItem();
  private currentSearchText: string;
  private canSearch = true;
  private medicines: Medicine[];
  private selectedMedicine: Medicine;
  public isLoading;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { prescription: Prescription },
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddPrescriptionItemComponent>,
              private medicinesService: MedicineService,
              private prescriptionService: PrescriptionService) {
  }

  ngOnInit() {
    this.addItemForm = this.formBuilder.group({
      medicineName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      takingDurationDays: ['', Validators.required],
      takingTime: ['', Validators.required],
      description: ['', Validators.required],
      dosage: ['', Validators.required],
      isReminderEnabled: [true, Validators.required]
    });

    this.addItemForm.get('medicineName').valueChanges
      .subscribe(value => {
        if (this.medicines && !this.medicines.find(medicine => medicine.name === value)) {
          this.canSearch = true;
        }
        this.currentSearchText = value;
      });

    this.addItemForm.get('medicineName').valueChanges
      .pipe(
        delay(1500)
      )
      .subscribe((value: string) => {
        if (value && value.trim().length !== 0 && this.currentSearchText === value && this.canSearch) {
          this.isLoading = true;
          this.canSearch = false;
          this.medicines = null;

          this.medicinesService.getMedicines(0, 8, value)
            .pipe(finalize(() => {
              this.canSearch = true;
              this.isLoading = false;
            }))
            .subscribe(medicines => {
              this.medicines = medicines;
            });
        }
      });

    this.prescriptionItem.prescription = this.data.prescription;
  }

  addPrescriptionItem() {
    this.isLoading = true;

    if (this.medicines.filter(value => value.name === this.currentSearchText)) {
      this.prescriptionItem.medicine = this.selectedMedicine;
      this.prescriptionItem.startDate = this.addItemForm.get('startDate').value;
      this.prescriptionItem.endDate = this.addItemForm.get('endDate').value;
      this.prescriptionItem.takingDurationDays = this.addItemForm.get('takingDurationDays').value;
      this.prescriptionItem.takingTime = this.addItemForm.get('takingTime').value;
      this.prescriptionItem.description = this.addItemForm.get('description').value;
      this.prescriptionItem.dosage = this.addItemForm.get('dosage').value;
      this.prescriptionItem.isReminderEnabled = this.addItemForm.get('isReminderEnabled').value;

      console.log(this.prescriptionItem);

      this.prescriptionService.addPrescriptionItem(this.prescriptionItem)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          value => {
            console.log(value);
            this.dialogRef.close();
          },
          error => console.log(error)
        );
    }
  }

  onOptionClick(medicine: Medicine) {
    this.selectedMedicine = medicine;
    this.canSearch = false;
  }
}
