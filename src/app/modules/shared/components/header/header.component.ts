import {Component, OnDestroy, OnInit} from '@angular/core';
import {Patient} from '../../../../models/patient';
import {PatientService} from '../../../../services/patient.service';
import {AuthService} from '../../../../services/auth.service';
import {NotificationService} from '../../../../services/notification.service';
import {Subject} from "rxjs";
import {finalize, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public user: Patient;
  public notificationList: Notification[];
  public reminderList: Notification[];
  public notificationsAndRemindersCount = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private patientService: PatientService,
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.patientService.user$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(user => this.user = user);
    this.notificationService.reminderAndNotificationCount$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(count => this.notificationsAndRemindersCount = count);
  }

  logout() {
    this.authService.logout();
    this.user = undefined;
    this.notificationList = undefined;
    this.reminderList = undefined;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
