import {Component, OnDestroy, OnInit} from '@angular/core';
import {Patient} from '../../../../models/patient';
import {PatientService} from '../../../../services/patient.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EditComponent} from './components/edit/edit.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {Subject} from "rxjs";
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  patient: Patient;
  public dialogRefEdit: MatDialogRef<EditComponent>;
  public dialogRefChange: MatDialogRef<ChangePasswordComponent>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private patientService: PatientService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.patientService.user$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((data: Patient) => {
        this.patient = data;
      });
  }

  editUser() {
    this.dialogRefEdit = this.dialog.open(EditComponent, {
      data: {patient: this.patient},
    });

    this.dialogRefEdit.afterClosed().subscribe(result => {
      if (result) {
        this.patient = result;
      }
    });
  }

  changePassword() {
    this.dialogRefChange = this.dialog.open(ChangePasswordComponent);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
