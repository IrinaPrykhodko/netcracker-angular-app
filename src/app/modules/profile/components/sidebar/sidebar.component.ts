import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../../../services/notification.service';
import {Notification} from '../../../../models/notification';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public notificationList: Notification[];
  public reminderList: Notification[];
  public notificationsAndRemindersCount = 0;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.reminderAndNotificationCount$
      .subscribe(count => this.notificationsAndRemindersCount = count);
  }

}
