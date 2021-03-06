import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';
import { ScheduleUserViewPage } from './scheduleUserView.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ScheduleUserViewPage
      }
    ]),
    ComponentsModule
  ],
  declarations: [ScheduleUserViewPage]
})
export class ScheduleUserViewPageModule {}
