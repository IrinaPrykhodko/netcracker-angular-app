import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../../../../services/register.service';
import {Patient} from '../../../../models/patient';
import {PasswordStateMatcher} from '../../../../models/PasswordStateMatcher';
import {CountryISO, SearchCountryField, TooltipLabel} from 'ngx-intl-tel-input';
import {PhoneNumberUtil} from 'google-libphonenumber';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from '../../../../services/spinner.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public patient: Patient = new Patient();
  public registerForm: FormGroup;
  public matcher = new PasswordStateMatcher();
  public isLoading;

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Ukraine];

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private spinnerService: SpinnerService) {
  }

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
      phoneNumber: [this.patient.phoneNumber, [Validators.required], PhoneNumberUtil.getInsta],
      password: [this.patient.password, [Validators.required, Validators.minLength(3)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(3)]]
    }, {validator: this.checkPasswords});
  }

  clearForm(registerForm: FormGroup) {
    const clearRegisterForm = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      dateOfBirth: this.registerForm.value.dateOfBirth,
      gender: this.registerForm.value.gender,
      height: this.registerForm.value.height,
      weight: this.registerForm.value.weight,
      location: this.registerForm.value.location,
      email: this.registerForm.value.email,
      phoneNumber: this.registerForm.value.phoneNumber.dialCode + this.registerForm.value.phoneNumber.number,
      password: this.registerForm.value.password
    };
    return clearRegisterForm;
  }

  submitForm() {
    this.spinnerService.setIsLoading(true);
    this.registerService.register(this.clearForm(this.registerForm))
      .pipe(
        finalize(() => this.spinnerService.setIsLoading(false))
      )
      .subscribe((userData) => {
        console.log(userData);
        sessionStorage.setItem('registerUser', JSON.stringify(userData));
        window.location.href = 'login';
      }, (error => {
        console.log(error);
        alert('Error');
      }));
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const passwordConfirm = group.get('passwordConfirm').value;

    return password === passwordConfirm ? null : {notSame: true};
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
