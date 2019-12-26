import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MedicineKitComponent } from './components/medicine-kit/medicine-kit.component';
import { AllMedicinesComponent } from './components/all-medicines/all-medicines.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import {ProfileRoutingModule} from './profile-routing.module';
import { AccountComponent } from './components/account/account.component';
import {SharedModule} from '../shared/shared.module';
import {EditComponent} from "./components/account/components/edit/edit.component";
import { ChangePasswordComponent } from './components/account/components/change-password/change-password.component';
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [
    SidebarComponent,
    ProfileComponent,
    MedicineKitComponent,
    AllMedicinesComponent,
    PurchasesComponent,
    NotificationsComponent,
    DoctorsComponent,
    PrescriptionsComponent,
    AccountComponent,
    EditComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    MatDialogModule
  ]
})
export class ProfileModule { }
