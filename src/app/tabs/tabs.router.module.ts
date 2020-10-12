import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { NewsPage } from './news/news.page';
import { SingleNewsPage } from './single_news/single_news.page';
import { TradingStarPage } from './trading_star/trading_star.page';
import { NutritionRecoveryJournalPage } from './nutritionRecoveryJournal/nutritionRecoveryJournal.page';
import { CoachPage } from './coach/coach.page';
import { ClientPage } from './client/client.page';
import { NewJournalEntryPage } from './new_journal_entry/new_journal_entry.page';
import { AppointmentsPage } from './appointments/appointments.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'Profile',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'appointments',
        children: [
          {
            path: '',
            component : AppointmentsPage
          }
        ]
      },
      {
        path: 'Message',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'watch_videos',
        children: [
          {
            path: '',
            loadChildren: '../watch_video/watch_video.module#WatchVideosPageModule'
          }
        ]
      },
      {
        path: 'news',
        children: [
          {
            path: '',
            component: NewsPage,
            //loadChildren: '../news/news.module#NewsPageModule'
          }
        ]
      },
      {
        path: 'single_news',
        children: [
          {
            path: '',
            component: SingleNewsPage,
            //loadChildren: '../single_news/single_news.module#SingleNewsPageModule'
          }
        ]
      },
      {
        path: 'trading_star',
        children: [
          {
            path: '',
            component: TradingStarPage,
            
          }
        ]
      },
      {
        path: 'nutritionRecoveryJournal',
        children: [
          {
            path: '',
            component: NutritionRecoveryJournalPage,
            
          }
        ]
      },
      {
        path: 'coaches',
        children: [
          {
            path: '',
            component: CoachPage,
            
          }
        ]
      },
      {
        path: 'clients',
        children: [
          {
            path: '',
            component: ClientPage,
            
          }
        ]
      },
      {
        path: 'new_entry',
        children: [
          {
            path: '',
            component: NewJournalEntryPage,
            
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
