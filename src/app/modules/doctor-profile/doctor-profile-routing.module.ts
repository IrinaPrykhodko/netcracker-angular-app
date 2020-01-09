import {RouterModule, Routes} from "@angular/router";
import {DoctorProfileComponent} from "./doctor-profile/doctor-profile.component";
import {NgModule} from "@angular/core";
import {AuthGuard} from "../../helpers/auth-guard.service";

import {RequestComponent} from "./request/request.component";
import {NotificationsComponent} from "./notifications/notifications.component";
import {PatientsComponent} from "./patients/patients.component";
import {AllMedicinesComponent} from "./all-medicines/all-medicines.component";
import {AccountComponent} from "./account/account.component";

const routes: Routes = [
  {
    path: '',
    component: DoctorProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'request',
        pathMatch: 'full'
      },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'request',
        component: RequestComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'patients',
        component: PatientsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'all-medicines',
        component: AllMedicinesComponent,
        canActivate: [AuthGuard]
      }
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
