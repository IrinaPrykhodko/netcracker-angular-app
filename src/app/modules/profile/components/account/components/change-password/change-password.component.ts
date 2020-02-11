import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from '../../../../../../services/patient.service';
import {finalize} from 'rxjs/operators';
import {MatDialogRef} from '@angular/material/dialog';
import {SpinnerService} from '../../../../../../services/spinner.service';
import {PasswordStateMatcher} from '../../../../../../models/PasswordStateMatcher';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changeForm: FormGroup;
  passwordMatcher = new PasswordStateMatcher();

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              public dialogRef: MatDialogRef<ChangePasswordComponent>,
              private spinnerService: SpinnerService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.changeForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(3)]],
      newPasswordConfirm: ['', [Validators.required]]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('newPassword').value;
    const passwordConfirm = group.get('newPasswordConfirm').value;

    return password === passwordConfirm ? null : {confirmedPasswordNotMatch: true};
  }

  get password() {
    return this.changeForm.get('password');
  }

  get newPassword() {
    return this.changeForm.get('newPassword');
  }

  get newPasswordConfirm() {
    return this.changeForm.get('newPasswordConfirm');
  }

  submit() {
    this.spinnerService.setIsLoading(true);

    this.patientService.changePassword(this.changeForm.value)
      .pipe(
        finalize(() => {
          this.spinnerService.setIsLoading(false);
        })
      )
      .subscribe(value => {
        this.dialogRef.close();
      }, error => {
        this.toast.warning('Incorrect password');
      });
  }
}
