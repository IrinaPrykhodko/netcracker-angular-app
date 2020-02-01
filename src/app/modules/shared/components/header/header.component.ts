import {Component, OnInit} from '@angular/core';
import {Patient} from '../../../../models/patient';
import {PatientService} from '../../../../services/patient.service';
import {AuthService} from '../../../../services/auth.service';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: Patient;
  public notificationList: Notification[];
  public reminderList: Notification[];
  public notificationsAndRemindersCount = 0;

  constructor(private patientService: PatientService,
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.patientService.user$.subscribe(user => this.user = user);
    this.notificationService.reminderAndNotificationCount$.subscribe(count => this.notificationsAndRemindersCount = count);
  }

  logout() {
    this.authService.logout();
    this.user = undefined;
    this.notificationList = undefined;
    this.reminderList = undefined;
  }
}
