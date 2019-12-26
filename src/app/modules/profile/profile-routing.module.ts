import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './components/profile/profile.component';
import {MedicineKitComponent} from './components/medicine-kit/medicine-kit.component';
import {DoctorsComponent} from './components/doctors/doctors.component';
import {PrescriptionsComponent} from './components/prescriptions/prescriptions.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {PurchasesComponent} from './components/purchases/purchases.component';
import {AllMedicinesComponent} from './components/all-medicines/all-medicines.component';
import {AccountComponent} from './components/account/account.component';
import {EditComponent} from './components/account/components/edit/edit.component';
import {ChangePasswordComponent} from './components/account/components/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'medicine-kit',
        pathMatch: 'full'
      },
      {
        path: 'medicine-kit',
        component: MedicineKitComponent
      },
      {
        path: 'doctors',
        component: DoctorsComponent
      },
      {
        path: 'prescriptions',
        component: PrescriptionsComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'purchases',
        component: PurchasesComponent
      },
      {
        path: 'all-medicines',
        component: AllMedicinesComponent
      },
      {
        path: 'account',
        component: AccountComponent,
        children: [
          {
            path: 'edit',
            component: EditComponent
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
