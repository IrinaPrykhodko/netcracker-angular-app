import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../../../../services/notification.service';
import {SpinnerService} from '../../../../../../services/spinner.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-reminder-delete',
  templateUrl: './reminder-delete.component.html',
  styleUrls: ['./reminder-delete.component.scss']
})
export class ReminderDeleteComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },
              private dialogRef: MatDialogRef<ReminderDeleteComponent>,
              private notificationService: NotificationService,
              private spinnerService: SpinnerService) {

  }

  ngOnInit() {
  }

  deleteOk() {
    this.spinnerService.setIsLoading(true);
    this.notificationService.deleteNotification(this.data.id)
      .pipe(finalize(() => {
        this.spinnerService.setIsLoading(false),
        takeUntil(this.destroy$)
      }))
      .subscribe(value => this.dialogRef.close());
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
