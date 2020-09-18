import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';
import { ScheduleSessionPage } from './scheduleSession.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ScheduleSessionPage
      }
    ]),
    ComponentsModule
  ],
  declarations: [ScheduleSessionPage]
})
export class ScheduleSessionPageModule {}
