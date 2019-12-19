import { Component, OnInit } from '@angular/core';
import {Patient} from "../../../../models/patient";
import {PatientService} from "../../../../services/patient.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  patient: Patient;

  constructor(private patientService: PatientService){}

  ngOnInit(){

    this.patientService.getPatient().subscribe((data:Patient) => this.patient=data);
  }
}
