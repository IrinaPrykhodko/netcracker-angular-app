import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {finalize, takeUntil} from 'rxjs/operators';
import {ForgotPasswordService} from '../../../../services/forgot-password.service';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  public emailValue = '';
  public emailForm: FormGroup;
  public isLoading;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder,
              private forgotPasswordService: ForgotPasswordService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: [this.emailValue, [Validators.required, Validators.email]]
    });
  }

  submitForm() {
    console.log(this.email.value);

    this.isLoading = true;
    this.forgotPasswordService.email(this.email.value)
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.toastr.success('Please, check your email. ' + this.email.value + '. Link will be active 30 minutes', 'Success');
      }, error => {
        this.toastr.error('User with email ' + this.email.value + ' not found', 'Error');
      });

  }

  get email() {
    return this.emailForm.get('email');
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
