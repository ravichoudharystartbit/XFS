import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentTestPage } from './paymentTest.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentTestPageRoutingModule {}
