import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from '../../../../../../services/patient.service';
import {finalize} from 'rxjs/operators';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public isLoading;
  public changeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              public dialogRef: MatDialogRef<ChangePasswordComponent>) {
  }

  ngOnInit() {
    this.changeForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPasswordConfirm: ['', [Validators.required]]
    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('newPassword').value;
    const passwordConfirm = group.get('newPasswordConfirm').value;

    return password === passwordConfirm ? null : {notSame: true};
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
    console.log(this.changeForm.value);
    this.isLoading = true;
    this.patientService.changePassword(this.changeForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.dialogRef.close();
        })
      )
      .subscribe();
  }
}
