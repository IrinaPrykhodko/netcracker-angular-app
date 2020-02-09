import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Notification} from '../../../../../../models/notification';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../../../../services/notification.service';
import {SpinnerService} from '../../../../../../services/spinner.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-notification-delete-dialog',
  templateUrl: './notification-delete-dialog.component.html',
  styleUrls: ['./notification-delete-dialog.component.scss']
})
export class NotificationDeleteDialogComponent implements OnInit, OnDestroy {

  public notificationId: number;
  destroy$: Subject<boolean> = new Subject<boolean>();

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
      .pipe(
        finalize(() => { this.spinnerService.setIsLoading(false); }),
        takeUntil(this.destroy$)
        )
      .subscribe(value => this.dialogRef.close(true));
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
