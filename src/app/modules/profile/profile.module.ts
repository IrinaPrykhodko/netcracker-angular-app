import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SidebarComponent} from './components/sidebar/sidebar.component';
import {ProfileComponent} from './components/profile/profile.component';
import {MedicineKitComponent} from './components/medicine-kit/medicine-kit.component';
import {AllMedicinesComponent} from './components/all-medicines/all-medicines.component';
import {PurchasesComponent} from './components/purchases/purchases.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {DoctorsComponent} from './components/doctors/doctors.component';
import {PrescriptionsComponent} from './components/prescriptions/prescriptions.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {AccountComponent} from './components/account/account.component';
import {SharedModule} from '../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {EditComponent} from './components/account/components/edit/edit.component';
import {ChangePasswordComponent} from './components/account/components/change-password/change-password.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {AddComponent} from './components/medicine-kit/components/add/add.component';
import {AddPrescriptionComponent} from './components/prescriptions/components/add-prescription/add-prescription.component';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {AddPrescriptionItemComponent} from './components/prescriptions/components/add-prescription-item/add-prescription-item.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatGridListModule} from '@angular/material/grid-list';
import { ReminderButtonOkComponent } from './components/notifications/components/reminder-button-ok/reminder-button-ok.component';
import {TooltipModule} from 'ngx-bootstrap';
// tslint:disable-next-line:max-line-length
import {NotificationDeleteDialogComponent} from './components/notifications/components/notification-delete-dialog/notification-delete-dialog.component';
import {MedicineKitItemComponent} from './components/medicine-kit-item/medicine-kit-item.component';
import { AddMedicineToPurchasesComponent } from './components/add-medicine-to-purchases/add-medicine-to-purchases.component';
import { ReminderDeleteComponent } from './components/notifications/components/reminder-delete/reminder-delete.component';

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
    ChangePasswordComponent,
    AddComponent,
    AddPrescriptionComponent,
    AddPrescriptionItemComponent,
    ReminderButtonOkComponent,
    NotificationDeleteDialogComponent,
    MedicineKitItemComponent,
    AddMedicineToPurchasesComponent
    ReminderDeleteComponent
  ],

  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    MatDialogModule,
    NgxPaginationModule,
    MatExpansionModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatGridListModule,
    TooltipModule
  ],
  entryComponents: [
    PrescriptionsComponent,
    AddPrescriptionComponent,
    ChangePasswordComponent,
    EditComponent,
    AddPrescriptionItemComponent,
    ReminderButtonOkComponent,
    AddMedicineToPurchasesComponent
    ReminderDeleteComponent,
    NotificationDeleteDialogComponent
  ]
})
export class ProfileModule {
}
