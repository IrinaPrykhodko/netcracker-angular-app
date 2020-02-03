import {Component, Inject, OnInit} from '@angular/core';
import {Notification} from '../../../../../../models/notification';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../../../../services/notification.service';
import {SpinnerService} from '../../../../../../services/spinner.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-notification-delete-dialog',
  templateUrl: './notification-delete-dialog.component.html',
  styleUrls: ['./notification-delete-dialog.component.scss']
})
export class NotificationDeleteDialogComponent implements OnInit {

  public notificationId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {notificationId: number},
              private dialogRef: MatDialogRef<NotificationDeleteDialogComponent>,
              private notificationService: NotificationService,
              private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.notificationId = this.data.notificationId;
  }

  deleteNotification(notificationId: number): void {
    this.spinnerService.setIsLoading(true);

    this.notificationService.deleteNotification(notificationId)
      .pipe(finalize(() => {
      this.spinnerService.setIsLoading(false);
    }))
      .subscribe(value => this.dialogRef.close());
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
