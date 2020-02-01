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
import {TooltipModule} from 'ngx-bootstrap';

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
    AddPrescriptionItemComponent
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
    AddPrescriptionItemComponent
  ]
})
export class ProfileModule {
}
