import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../../../../services/notification.service';
import {SpinnerService} from '../../../../../../services/spinner.service';
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-reminder-delete',
  templateUrl: './reminder-delete.component.html',
  styleUrls: ['./reminder-delete.component.scss']
})
export class ReminderDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },
              private dialogRef: MatDialogRef<ReminderDeleteComponent>,
              private notificationService: NotificationService,
              private spinnerService: SpinnerService) {

  }

  ngOnInit() {
  }

  deleteOk(){
    this.spinnerService.setIsLoading(true);
    this.notificationService.deleteNotification(this.data.id)
      .pipe(finalize(() => {
        this.spinnerService.setIsLoading(false);
      }))
      .subscribe(value => this.dialogRef.close());
  }

  cancel(){
    this.dialogRef.close();
  }
}
