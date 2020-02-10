import {Component, OnDestroy, OnInit} from '@angular/core';
import {PatientService} from '../../../../services/patient.service';
import {finalize, map, takeUntil} from 'rxjs/operators';
import {SpinnerService} from '../../../../services/spinner.service';
import {NotificationService} from '../../../../services/notification.service';
import {combineLatest, Subject} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  private intervalId;

  paginationOptions = {
    pageNumber: 0,
    size: 10,
  };

  constructor(private patientService: PatientService,
              private spinnerService: SpinnerService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.spinnerService.setIsLoading(true);

    this.patientService.getPatient()
      .pipe(
        finalize(() => this.spinnerService.setIsLoading(false)),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.updateNotificationsCounter();

    this.intervalId = setInterval(() => {
      this.updateNotificationsCounter();
    }, 1000 * 60 * 5);
  }

  updateNotificationsCounter() {
    combineLatest(this.notificationService.getReminders(this.paginationOptions.pageNumber, this.paginationOptions.size),
      this.notificationService.getNotifications(this.paginationOptions.pageNumber, this.paginationOptions.size))
      .pipe(
        map(([notifications, reminders]) => {
          this.notificationService.setCounter(notifications.length + reminders.length);
          return [notifications, reminders];
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
