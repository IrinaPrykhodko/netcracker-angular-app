import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ForgotPasswordComponent} from "../forgot-password/components/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";

const routes: Routes = [
  {path: '', component: ResetPasswordComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ResetPasswordRoutingModule { }
