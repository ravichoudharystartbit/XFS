import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignupOptionStep2Page } from './signup_option_step2.page';

const routes: Routes = [
  {
    path: '',
    component: SignupOptionStep2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SignupOptionStep2Page]
})
export class SignupOptionStep2PageModule {}
