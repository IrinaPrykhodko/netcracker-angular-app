import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService

  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: [this.user.login, [Validators.required]],
      password: [this.user.password, [Validators.required]]
    });
  }

  submitForm() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value)
      .subscribe((userData) => {
        console.log(userData);

      }, (error => {
        console.log(error);

      }));

  }

}
