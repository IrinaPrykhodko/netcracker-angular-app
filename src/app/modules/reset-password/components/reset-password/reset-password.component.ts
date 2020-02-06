import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {finalize, takeUntil} from 'rxjs/operators';
import {ResetPasswordService} from '../../../../services/reset-password.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  public isLoading;
  public resetForm: FormGroup;
  private token;
  public isTokenValid;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder,
              private resetPasswordService: ResetPasswordService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    console.log('token = ' + this.token);
    this.isLoading = true;

    this.resetPasswordService.checkToken(this.token)
      .pipe(
        finalize(() => { this.isLoading = false; }),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        console.log(value);
        this.isTokenValid = true;
      }, error => {
        console.log(error);
        this.isTokenValid = false;
        this.toastr.error('Link was expired', 'Error');
        window.location.href = 'forgot-password';
      });

    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: this.checkPasswords});
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('newPassword').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : {notSame: true};
  }

  get newPassword() {
    return this.resetForm.get('newPassword');
  }

  get confirmPassword() {
    return this.resetForm.get('confirmPassword');
  }

  submit() {
    console.log('token = ' + this.token + ' new password = ' + this.newPassword.value);
    this.isLoading = true;
    this.resetPasswordService.resetPassword(this.token, this.newPassword.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.toastr.success('Your password was changed', 'Success');
        window.location.href = 'login';
      }, error => {
        this.toastr.error('Please, try again', 'Error');
      });
  }

}
