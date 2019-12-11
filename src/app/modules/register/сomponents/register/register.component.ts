import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {RegisterService} from "../../../../services/register.service";
import {Patient} from "../../../../models/patient";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public patient: Patient = new Patient();
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService

  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [this.patient.firstName, [Validators.required]],
      lastName: [this.patient.lastName, [Validators.required]],
      dateOfBirth: [this.patient.dateOfBirth],
      gender: [this.patient.gender],
      height: [this.patient.height],
      weight: [this.patient.weight],
      location: [this.patient.location],
      email: [this.patient.email, [Validators.required, Validators.email]],
      phoneNumber: [this.patient.phoneNumber, [Validators.required]],
      password: [this.patient.password, [Validators.required]],
      passwordConfirm: [this.patient.passwordConfirm, [Validators.required]]
    });
  }

  submitForm() {
    console.log(this.registerForm.value);
    this.registerService.register(this.registerForm.value)
      .subscribe((userData) => {
        console.log(userData);
      }, (error => {
        console.log(error);
      }));

  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }
  get passwordConfirm() {
    return this.registerForm.get('passwordConfirm');
  }
}
