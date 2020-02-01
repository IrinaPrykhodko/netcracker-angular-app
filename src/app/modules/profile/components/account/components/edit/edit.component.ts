import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from '../../../../../../services/patient.service';
import {Patient} from '../../../../../../models/patient';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from '../../../../../../services/spinner.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public patient: Patient = new Patient();
  public editForm: FormGroup;
  maxBirthDate = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { patient: Patient },
              private formBuilder: FormBuilder,
              private patientService: PatientService,
              public dialogRef: MatDialogRef<EditComponent>,
              private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      dateOfBirth: [''],
      height: ['', Validators.min(0)],
      weight: ['', Validators.min(0)],
      location: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern('[+][0-9]{12}')]],
      email: ['', [Validators.email, Validators.required]],
    });

    this.patient = this.data.patient;
    this.editForm.patchValue({...this.patient});
  }

  get height() {
    return this.editForm.get('height');
  }

  get weight() {
    return this.editForm.get('weight');
  }

  get email() {
    return this.editForm.get('email');
  }

  get firstName() {
    return this.editForm.get('firstName');
  }

  public get lastName() {
    return this.editForm.get('lastName');
  }

  get phoneNumber() {
    return this.editForm.get('phoneNumber');
  }

  submit() {
    this.spinnerService.setIsLoading(true);

    this.patientService.editPatient(this.editForm.value)
      .pipe(finalize(() => {
        this.spinnerService.setIsLoading(false);
      }))
      .subscribe(value => this.dialogRef.close());
  }
}
