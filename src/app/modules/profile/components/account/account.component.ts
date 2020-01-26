import {Component, OnInit} from '@angular/core';
import {Patient} from '../../../../models/patient';
import {PatientService} from '../../../../services/patient.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EditComponent} from './components/edit/edit.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  patient: Patient;
  public isLoading;
  public dialogRefEdit: MatDialogRef<EditComponent>;
  public dialogRefChange: MatDialogRef<ChangePasswordComponent>;

  constructor(private patientService: PatientService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.isLoading = true;

    this.patientService.user$
      .subscribe((data: Patient) => {
        console.log(data);
        this.patient = data;
        this.isLoading = false;
      });
  }

  editUser() {
    this.dialogRefEdit = this.dialog.open(EditComponent, {
      data: {patient: this.patient},
    });

    this.dialogRefEdit.afterClosed().subscribe(result => {
      this.patient = result;
    });
  }

  changePassword() {
    this.dialogRefChange = this.dialog.open(ChangePasswordComponent);
  }
}
