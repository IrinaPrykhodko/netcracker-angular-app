import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from "../../../../../../services/patient.service";
import {Patient} from "../../../../../../models/patient";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public patient: Patient = new Patient();
  public editForm: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.getPatient().subscribe((data: Patient) => this.patient = data);
    this.editForm = this.formBuilder.group({
      firstName: [this.patient.firstName],
      lastName: [this.patient.lastName],
      dateOfBirth: [this.patient.dateOfBirth],
      gender: [this.patient.gender],
      height: [this.patient.height],
      weight: [this.patient.weight],
      location: [this.patient.location],
      email: [this.patient.email, [Validators.email]],
    });
  }

  get email() {
    return this.editForm.get('email');
  }
  get firstName() {
    return this.editForm.get('firstName');
  }
  get lastName() {
    return this.editForm.get('lastName');
  }
  get phoneNumber() {
    return this.editForm.get('phoneNumber');
  }

  submit() {
    console.log(this.editForm.value);
    this.patientService.editPatient(this.editForm.value)
      .subscribe((userData) => {
        console.log(userData);
      }, (error => {
        console.log(error);
      }));
  }
}
