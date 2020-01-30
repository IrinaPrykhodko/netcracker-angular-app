import {Component, OnInit} from '@angular/core';
import {PatientService} from '../../../../services/patient.service';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from '../../../../services/spinner.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private patientService: PatientService,
              private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.setIsLoading(true);

    this.patientService.getPatient()
      .pipe(
        finalize(() => this.spinnerService.setIsLoading(false))
      )
      .subscribe();
  }
}
