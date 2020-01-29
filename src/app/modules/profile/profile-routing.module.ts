import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './components/profile/profile.component';
import {MedicineKitComponent} from './components/medicine-kit/medicine-kit.component';
import {DoctorsComponent} from './components/doctors/doctors.component';
import {PrescriptionsComponent} from './components/prescriptions/prescriptions.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {PurchasesComponent} from './components/purchases/purchases.component';
import {AllMedicinesComponent} from './components/all-medicines/all-medicines.component';
import {AccountComponent} from './components/account/account.component';
import {AuthGuard} from '../../helpers/auth-guard.service';
import {AddComponent} from './components/medicine-kit/components/add/add.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'account',
        pathMatch: 'full'
      },
      {
        path: 'medicine-kit',
        component: MedicineKitComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'add',
            component: AddComponent
          }
        ]
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'prescriptions',
        component: PrescriptionsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'purchases',
        component: PurchasesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'all-medicines',
        component: AllMedicinesComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
