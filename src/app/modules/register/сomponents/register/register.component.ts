import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {RegisterService} from '../../../../services/register.service';
import {Patient} from '../../../../models/patient';
import {MyErrorStateMatcher} from '../../../../models/MyErrorStateMatcher';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public patient: Patient = new Patient();
  public registerForm: FormGroup;
  public matcher = new MyErrorStateMatcher();
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Ukraine];

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
      passwordConfirm: ['', [Validators.required]]
    }, {validator: this.checkPasswords});
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

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const passwordConfirm = group.get('passwordConfirm').value;

    return password === passwordConfirm ? null : { notSame: true };
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
