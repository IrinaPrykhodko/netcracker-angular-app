import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../../../services/notification.service';
import {Notification} from '../../../../models/notification';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from '../../../../services/spinner.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ReminderButtonOkComponent} from './components/reminder-button-ok/reminder-button-ok.component';
import {NotificationDeleteDialogComponent} from './components/notification-delete-dialog/notification-delete-dialog.component';
import {AddMiToPurchasesComponent} from '../add-mi-to-purchases/add-mi-to-purchases.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public reminderButtonOkRef: MatDialogRef<ReminderButtonOkComponent>;
  public notificationDeleteRef: MatDialogRef<NotificationDeleteDialogComponent>;
  public addMedicineToPurchaseRef: MatDialogRef<AddMiToPurchasesComponent>;

  notificationList: Notification[];
  reminderList: Notification[];

  paginationOptions = {
    pageNumber: 0,
    size: 50,
  };

  constructor(private notificationService: NotificationService,
              private spinnerService: SpinnerService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.spinnerService.setIsLoading(true);
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.notificationService.getReminders(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .subscribe((data: Notification[]) => {
        this.reminderList = this.reminderList ? this.reminderList.concat(data) : data;
        console.log(this.reminderList);
      });
    this.notificationService.getNotifications(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
      .subscribe((data: Notification[]) => {
        this.notificationList = this.notificationList ? this.notificationList.concat(data) : data;
        console.log(this.notificationList);
      });
  }

  clickReminderButtonOk(reminder: Notification): void {
    this.reminderButtonOkRef = this.dialog.open(ReminderButtonOkComponent, {
      data: {reminder}
    });

    this.reminderButtonOkRef.afterClosed()
      .subscribe(result => {
        this.spinnerService.setIsLoading(true);
        this.notificationList = null;
        this.reminderList = null;
        this.getAllNotifications();
      });
  }

  deleteNotification(notificationId: number) {
    this.notificationDeleteRef = this.dialog.open(NotificationDeleteDialogComponent, {
      data: {notificationId}
    });

    this.notificationDeleteRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.spinnerService.setIsLoading(true);
          this.notificationList = null;
          this.reminderList = null;
          this.getAllNotifications();
        }
      });
  }

  addMedicineInstanceToPurchase(medicineInstanceId: number) {
    console.log('medicine instance id ' + medicineInstanceId);
    this.addMedicineToPurchaseRef = this.dialog.open(AddMiToPurchasesComponent, {
      data: {medicineInstanceId}
    });
  }
}
