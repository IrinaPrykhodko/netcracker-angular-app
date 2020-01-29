import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {ResetPasswordRoutingModule} from './reset-password-routing.module';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    SharedModule
  ]
})
export class ResetPasswordModule { }
