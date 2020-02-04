import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {RouterModule} from '@angular/router';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {MatMenuModule} from '@angular/material/menu';
import {ToastrModule} from 'ngx-toastr';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {NgxMaskModule} from 'ngx-mask';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, SpinnerComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    NgxIntlTelInputModule,
    HttpClientModule,
    RouterModule,
    MatMenuModule,
    ToastrModule.forRoot(),
    MatIconModule,
    MatBadgeModule,
    NgxMaskModule.forRoot()

  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    NgxIntlTelInputModule,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    MatMenuModule,
    ToastrModule,
    MatBadgeModule,
    NgxMaskModule
  ]
})
export class SharedModule {
}
