import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {LoginResponseItem} from '../../../../models/loginResponseItem';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from '../../../../services/spinner.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private spinnerService: SpinnerService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    console.log(JSON.parse(sessionStorage.getItem('registerUser')));
    this.loginForm = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required]]
    });
  }

  submitForm() {
    this.spinnerService.setIsLoading(true);
    this.authService.login(this.loginForm.value)
      .pipe(
        finalize(() => this.spinnerService.setIsLoading(false))
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
}
