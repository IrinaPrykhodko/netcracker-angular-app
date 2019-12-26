import { Component, OnInit } from '@angular/core';
import {Patient} from "../../../../../../models/patient";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../../../../../services/patient.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {


  public patient: Patient = new Patient();
  public changeForm: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.getPatient().subscribe((data: Patient) => this.patient = data);
    this.changeForm = this.formBuilder.group({
      password: [this.patient.password, [Validators.required]],
      newPassword: [this.patient.password, [Validators.required]],
      newPasswordConfirm: [this.patient.dateOfBirth, [Validators.required]]
    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('newPassword').value;
    const passwordConfirm = group.get('newPasswordConfirm').value;

    return password === passwordConfirm ? null : { notSame: true };
  }

  get password() {
    return this.changeForm.get('password');
  }
  get newPassword() {
    return this.changeForm.get('newPassword');
  }
  get newPasswordConfirm() {
    return this.changeForm.get('newPasswordConfirm');
  }

  submit() {
    console.log(this.changeForm.value);
    this.patientService.changePassword(this.changeForm.value)
      .subscribe((userData) => {
        console.log(userData);
      }, (error => {
        console.log(error);
      }));
  }
}
