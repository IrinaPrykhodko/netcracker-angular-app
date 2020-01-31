import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PrescriptionItem} from '../../../../../../models/prescriptionItem';
import {Prescription} from '../../../../../../models/prescription';
import {Medicine} from '../../../../../../models/medicine';
import {MedicineService} from '../../../../../../services/medicine.service';
import {delay, finalize} from 'rxjs/operators';
import {PrescriptionService} from '../../../../../../services/prescription.service';
import {SpinnerService} from '../../../../../../services/spinner.service';

@Component({
  selector: 'app-add-prescription-item',
  templateUrl: './add-prescription-item.component.html',
  styleUrls: ['./add-prescription-item.component.scss']
})
export class AddPrescriptionItemComponent implements OnInit {

  public addItemForm: FormGroup;
  private prescriptionItem: PrescriptionItem = new PrescriptionItem();
  private currentSearchText: string;
  private canSearch = true;
  public medicines: Medicine[];
  private selectedMedicine: Medicine;

  defaultMinDate = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { prescription: Prescription },
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddPrescriptionItemComponent>,
              private medicinesService: MedicineService,
              private prescriptionService: PrescriptionService,
              private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.addItemForm = this.formBuilder.group({
      medicineName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      takingDurationDays: ['', Validators.required],
      takingTime: ['', Validators.required],
      description: [''],
      dosage: ['', [Validators.required, Validators.min(0)]],
      isReminderEnabled: [true, Validators.required]
    });

    this.medicineName.valueChanges
      .subscribe(value => {
        if (this.medicines && !this.medicines.find(medicine => medicine.name === value)) {
          this.canSearch = true;
        }
        this.currentSearchText = value;
      });

    this.medicineName.valueChanges
      .pipe(
        delay(1000)
      )
      .subscribe((value: string) => {
        if (value && value.trim().length !== 0 && this.currentSearchText === value && this.canSearch) {
          this.spinnerService.setIsLoading(true);
          this.canSearch = false;
          this.medicines = null;

          this.medicinesService.getMedicines(0, 8, value)
            .pipe(finalize(() => {
              this.canSearch = true;
              this.spinnerService.setIsLoading(false);
            }))
            .subscribe(medicines => {
              this.medicines = medicines;
            });
        }
      });

    this.prescriptionItem.prescription = this.data.prescription;
  }

  addPrescriptionItem() {
    this.spinnerService.setIsLoading(true);

    if (this.medicines.filter(value => value.name === this.currentSearchText).length !== 0) {
      this.prescriptionItem.medicine = this.selectedMedicine;
      this.prescriptionItem.startDate = this.startDate.value;
      this.prescriptionItem.endDate = this.endDate.value;
      this.prescriptionItem.takingDurationDays = this.takingDurationDays.value;
      this.prescriptionItem.takingTime = this.takingTime.value;
      this.prescriptionItem.description = this.description.value;
      this.prescriptionItem.dosage = this.dosage.value;
      this.prescriptionItem.isReminderEnabled = this.isReminderEnabled.value;

      console.log(this.prescriptionItem);

      this.prescriptionService.addPrescriptionItem(this.prescriptionItem)
        .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
        .subscribe(
          value => {
            this.dialogRef.close(value);
          },
          error => console.log(error)
        );
    } else {
      alert('Invalid medicine name');
    }
  }

  onOptionClick(medicine: Medicine) {
    this.selectedMedicine = medicine;
    this.canSearch = false;
  }

  get medicineName() {
    return this.addItemForm.get('medicineName');
  }

  get startDate() {
    return this.addItemForm.get('startDate');
  }

  get endDate() {
    return this.addItemForm.get('endDate');
  }

  get takingDurationDays() {
    return this.addItemForm.get('takingDurationDays');
  }

  get takingTime() {
    return this.addItemForm.get('takingTime');
  }

  get description() {
    return this.addItemForm.get('description');
  }

  get dosage() {
    return this.addItemForm.get('dosage');
  }

  get isReminderEnabled() {
    return this.addItemForm.get('isReminderEnabled');
  }
}
