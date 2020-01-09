import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {RouterModule} from "@angular/router";
import { RequestComponent } from './request/request.component';
import { AccountComponent } from './account/account.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PatientsComponent } from './patients/patients.component';
import { AllMedicinesComponent } from './all-medicines/all-medicines.component';



@NgModule({
  declarations: [DoctorProfileComponent, SidebarComponent, RequestComponent, AccountComponent, NotificationsComponent, PatientsComponent, AllMedicinesComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DoctorProfileModule { }
