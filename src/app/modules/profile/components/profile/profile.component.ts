import {Component, OnInit} from '@angular/core';
import {PatientService} from '../../../../services/patient.service';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from '../../../../services/spinner.service';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  searchText: string;

  paginationOptions = {
    pageNumber: 0,
    size: 4,
  };

  constructor(private patientService: PatientService,
              private spinnerService: SpinnerService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.spinnerService.setIsLoading(true);

    this.patientService.getPatient()
      .subscribe();

    //this.notificationService.getNotifications(this.paginationOptions.pageNumber, this.paginationOptions.size)
    this.notificationService.getNotifications()
      .subscribe();
    this.notificationService.getReminders()
      .pipe(
        finalize(() => this.spinnerService.setIsLoading(false))
      )
      .subscribe();
  }
}
