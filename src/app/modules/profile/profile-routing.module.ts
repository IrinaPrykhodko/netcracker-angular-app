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
import {EditComponent} from './components/account/components/edit/edit.component';
import {ChangePasswordComponent} from './components/account/components/change-password/change-password.component';
import {AuthGuard} from '../../helpers/auth-guard.service';
import {AddPurchaseComponent} from './components/purchases/components/add-purhase/add-purchase.component';

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
        component: MedicineKitComponent,
        canActivate: [AuthGuard]
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
        path: 'purchases/add',
        component: AddPurchaseComponent
      },
      {
        path: 'all-medicines',
        component: AllMedicinesComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'edit',
            component: EditComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
            canActivate: [AuthGuard]
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
export class ProfileRoutingModule {
}
