import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Prescription} from '../../../../../../models/prescription';
import {PrescriptionService} from '../../../../../../services/prescription.service';


@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss']
})
export class AddPrescriptionComponent implements OnInit {

  addPrescriptionForm: FormGroup;
  private prescription: Prescription = new Prescription();
  private isLoading;

  constructor(public dialogRef: MatDialogRef<AddPrescriptionComponent>,
              private formBuilder: FormBuilder,
              private prescriptionService: PrescriptionService) {
  }

  ngOnInit() {
    this.addPrescriptionForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  submit() {
    this.isLoading = true;
    this.prescription.date = this.addPrescriptionForm.value.date;
    this.prescription.name = this.addPrescriptionForm.value.name;

    this.prescriptionService.addPrescription(this.prescription)
      .subscribe(value => {
        this.isLoading = false;
        this.dialogRef.close(value);
      }, error => {
        console.log(error);
      });
  }
}
