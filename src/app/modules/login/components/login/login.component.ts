import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from 'src/app/models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {LoginResponseItem} from '../../../../models/loginResponseItem';
import {finalize, takeUntil} from 'rxjs/operators';
import {SpinnerService} from '../../../../services/spinner.service';
import {ToastrService} from 'ngx-toastr';

import {Subject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public user: User = new User();
  public loginForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private spinnerService: SpinnerService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    console.log(JSON.parse(sessionStorage.getItem('registerUser')));
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    this.spinnerService.setIsLoading(true);
    this.authService.login(this.loginForm.value)
      .pipe(
        finalize(() => this.spinnerService.setIsLoading(false)),
        takeUntil(this.destroy$)
      )
      .subscribe((loginResponseItem: LoginResponseItem) => {
        this.authService.setUserToken(loginResponseItem.token);
      }, (error => {
        console.log(error);
        this.toastr.error('Incorrect email or password', 'Error');
      }));

  }

  get registerUserEmail() {
    if (sessionStorage.getItem('registerUser') !== null) {
      return JSON.parse(sessionStorage.getItem('registerUser')).email;
    } else {
      return '';
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
