import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginRoutingModule} from './modules/login/login-routing.module';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {LoginModule} from './modules/login/login.module';
import {RegisterModule} from './modules/register/register.module';
import {SharedModule} from './modules/shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {ErrorInterceptor} from './helpers/error-interceptor.service';
import {TokenInterceptorService} from './helpers/token-interceptor.service';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';


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
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
      deps: [AuthService, Router]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
