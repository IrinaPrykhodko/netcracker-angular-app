import {Component, OnInit} from '@angular/core';
import {PatientService} from '../../../../services/patient.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public isLoading;

  constructor(private patientService: PatientService) {
  }

  ngOnInit() {
    this.isLoading = true;

    this.patientService.getPatient()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe();
  }
}
