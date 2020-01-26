import {Component, OnInit} from '@angular/core';
import {Patient} from '../../../../models/patient';
import {PatientService} from '../../../../services/patient.service';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: Patient;

  constructor(private patientService: PatientService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.patientService.user$.subscribe(user => this.user = user);
  }

  logout() {
    this.authService.logout();
    this.user = undefined;
  }
}
