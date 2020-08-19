import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerifyEmailPage } from './verify_email.page';
import { NgOtpInputModule } from  'ng-otp-input';

const routes: Routes = [
  {
    path: '',
    component: VerifyEmailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerifyEmailPage]
})
export class VerifyEmailPageModule {}
