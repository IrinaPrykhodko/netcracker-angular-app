import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from '../../../../../../services/patient.service';
import {Patient} from '../../../../../../models/patient';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public patient: Patient = new Patient();
  public editForm: FormGroup;
  public isLoading;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { patient: Patient },
              private formBuilder: FormBuilder,
              private patientService: PatientService,
              public dialogRef: MatDialogRef<EditComponent>) {
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: [''],
      height: [''],
      weight: [''],
      location: [''],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
    });

    this.patient = this.data.patient;

    this.editForm.patchValue({...this.patient});
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
    this.isLoading = true;
    console.log(this.editForm.value);

    this.patientService.editPatient(this.editForm.value)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe((userData) => {
        console.log(userData);
        this.dialogRef.close(userData);
      }, (error => {
        console.log(error);
      }));
  }
}
