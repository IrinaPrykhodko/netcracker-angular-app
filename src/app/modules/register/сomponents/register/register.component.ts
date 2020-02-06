import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../../../../services/register.service';
import {Patient} from '../../../../models/patient';
import {PasswordStateMatcher} from '../../../../models/PasswordStateMatcher';
import {CountryISO, SearchCountryField, TooltipLabel} from 'ngx-intl-tel-input';
import {PhoneNumberUtil} from 'google-libphonenumber';
import {finalize, takeUntil} from 'rxjs/operators';
import {SpinnerService} from '../../../../services/spinner.service';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public patient: Patient = new Patient();
  public registerForm: FormGroup;
  public passwordStateMatcher = new PasswordStateMatcher();
  public isLoading;
  destroy$: Subject<boolean> = new Subject<boolean>();

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Ukraine];
  maxBirthDayDate = new Date();
  genders = ['Male', 'Female'];

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      dateOfBirth: [''],
      gender: [''],
      height: ['', Validators.min(0)],
      weight: ['', Validators.min(0)],
      location: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required], PhoneNumberUtil.getInsta],
      password: ['', [Validators.required, Validators.minLength(3)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(3)]]
    }, {validator: this.passwordMatchValidator});
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  clearForm(registerForm: FormGroup) {
    const clearRegisterForm = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      dateOfBirth: this.registerForm.value.dateOfBirth,
      gender: this.registerForm.value.gender.toUpperCase(),
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
        finalize(() => this.spinnerService.setIsLoading(false)),
        takeUntil(this.destroy$)
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

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password').value;
    const passwordConfirm = group.get('passwordConfirm').value;

    return password === passwordConfirm ? null : {confirmedPasswordNotMatch: true};

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

  get height() {
    return this.registerForm.get('height');
  }

  get weight() {
    return this.registerForm.get('weight');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  get passwordConfirm() {
    return this.registerForm.get('passwordConfirm');
  }
}
