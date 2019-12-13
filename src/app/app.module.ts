import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginRoutingModule } from './modules/login/login-routing.module';
import {RegisterComponent} from './modules/register/сomponents/register/register.component';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {LoginModule} from './modules/login/login.module';
import {RegisterModule} from './modules/register/register.module';
import {SharedModule} from './modules/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    LoginRoutingModule,
    NgxIntlTelInputModule,
    LoginModule,
    RegisterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
