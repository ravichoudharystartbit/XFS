import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { PaymentTestPageRoutingModule } from "./paymentTest-routing.module";

import { PaymentTestPage } from "./paymentTest.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PaymentTestPageRoutingModule
  ],
  declarations: [PaymentTestPage]
})
export class PaymentTestPageModule {}
