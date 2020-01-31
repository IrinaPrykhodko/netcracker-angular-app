import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './сomponents/register/register.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    RegisterRoutingModule,
    SharedModule,
    CommonModule
  ],
  providers: []
})
export class RegisterModule {
}
