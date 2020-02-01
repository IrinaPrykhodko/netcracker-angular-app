import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './сomponents/register/register.component';
import {SharedModule} from '../shared/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    RegisterRoutingModule,
    SharedModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: []
})
export class RegisterModule {
}
