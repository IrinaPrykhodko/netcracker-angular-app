import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../../../services/notification.service';
import {Notification} from '../../../../models/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notificationList: Notification[];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getNotifications()
      .subscribe((data: Notification[]) => {
        this.notificationList = this.notificationList ? this.notificationList.concat(data) : data;
        console.log(this.notificationList);
      });
  }

}
