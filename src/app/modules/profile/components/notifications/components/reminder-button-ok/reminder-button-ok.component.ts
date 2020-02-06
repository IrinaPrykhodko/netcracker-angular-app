import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Notification} from '../../../../../../models/notification';
import {NotificationService} from '../../../../../../services/notification.service';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from '../../../../../../services/spinner.service';
import {ReminderDeleteComponent} from '../reminder-delete/reminder-delete.component';

@Component({
  selector: 'app-reminder-button-ok',
  templateUrl: './reminder-button-ok.component.html',
  styleUrls: ['./reminder-button-ok.component.scss']
})
export class ReminderButtonOkComponent implements OnInit {

  private reminder: Notification;
  private deleteRef: MatDialogRef<ReminderDeleteComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { reminder: Notification },
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<ReminderButtonOkComponent>,
              private notificationService: NotificationService,
              private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.reminder = this.data.reminder;
  }

  takeMedicine(): void {
    this.spinnerService.setIsLoading(true);

    this.notificationService.reminderAutoDecrement(this.reminder)
      .pipe(finalize(() => {
        this.spinnerService.setIsLoading(false);
      }))
      .subscribe(value => this.dialogRef.close(),
        error => {
          this.deleteRef = this.dialog.open(ReminderDeleteComponent, {
            data: {id: this.reminder.id}
          });
          this.deleteRef.afterClosed()
            .subscribe(value => this.dialogRef.close());
        });
  }

  notTakeMedicine(): void {
    this.dialogRef.close();
  }
}
