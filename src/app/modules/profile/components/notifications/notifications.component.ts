import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../../../services/notification.service';
import {Notification} from '../../../../models/notification';
import {finalize, map} from 'rxjs/operators';
import {SpinnerService} from '../../../../services/spinner.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notificationList: Notification[];
  reminderList: Notification[];

  paginationOptions = {
    pageNumber: 0,
    size: 4,
  };

  constructor(private notificationService: NotificationService,
              private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.setIsLoading(true);
    this.notificationService.getNotifications()
      .subscribe((data: Notification[]) => {
        this.notificationList = this.notificationList ? this.notificationList.concat(data) : data;
      });

    this.notificationService.getReminders()
      .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
      .subscribe((data: Notification[]) => {
          this.reminderList = this.reminderList ? this.reminderList.concat(data) : data;
      });
  }

}
