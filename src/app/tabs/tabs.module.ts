import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { NewsPage } from './news/news.page';
import { SingleNewsPage } from './single_news/single_news.page';
import {TimeAgoPipe} from 'time-ago-pipe';

import { TradingStarPage } from './trading_star/trading_star.page';
import { NutritionRecoveryJournalPage } from './nutritionRecoveryJournal/nutritionRecoveryJournal.page';
import { CoachPage } from './coach/coach.page';

import { ClientPage } from './client/client.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [
  	TabsPage,
  	NewsPage,
  	SingleNewsPage,
  	TimeAgoPipe,
    TradingStarPage,
    NutritionRecoveryJournalPage,
    CoachPage,
    ClientPage
  ]
})
export class TabsPageModule {}
