import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../models/user";
import {finalize} from "rxjs/operators";
import {LoginResponseItem} from "../../../../models/loginResponseItem";
import {ForgotPasswordService} from "../../../../services/forgot-password.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public emailValue = '';
  public emailForm: FormGroup;
  public isLoading;

  constructor(private formBuilder: FormBuilder,
              private forgotPasswordService: ForgotPasswordService) { }

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
        finalize(() => this.isLoading = false)
      )
      .subscribe(value => {
        alert("Message with link for reset password was send to your email " + this.email.value + ". Please, check your email. " +
          "Link will be active 30 minutes");
      }, error => {
        alert("User with email " + this.email.value + " not found");
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

}
