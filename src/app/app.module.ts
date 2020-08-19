import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { IonicStorageModule } from '@ionic/storage';

import { environment } from '../environments/environment';
import { SparklineModule, SparklineTooltipService } from '@syncfusion/ej2-angular-charts';
//import { VideocallPageModule } from './Videocallpages/videocall/videocall.module';
//import { IncomingcallPageModule } from './Videocallpages/incomingcall/incomingcall.module';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { ServiceForAllService } from './service-for-all.service';
//import { UserProvider } from './calluser/calluser/calluser';

import { PublisherComponent } from './publisher/publisher.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { OpentokService } from './opentok.service';



@NgModule({
  declarations: [
    AppComponent,
    PublisherComponent,
    SubscriberComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    IonicStorageModule.forRoot(),
    AngularFireMessagingModule,
    ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production }),
    SparklineModule,
   // VideocallPageModule,
   // IncomingcallPageModule
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SparklineTooltipService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeAudio,
    ServiceForAllService,
    OpentokService
  //  UserProvider
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


/*

Token:-
T1==cGFydG5lcl9pZD00Njg4Mzc5NCZzaWc9ZDIzMDQxNWQ5NzIzY2Q3ODAyZjczMWE3MDcxMGY1YmI3MDA5NTc4YjpzZXNzaW9uX2lkPTFfTVg0ME5qZzRNemM1Tkg1LU1UVTVOelkyT0RVME5UZzVNSDVNZEVnclRERXJkbXRxY0RsT1pXVjNLek5TTlVKQk5rcC1mZyZjcmVhdGVfdGltZT0xNTk3NjY4NzM1Jm5vbmNlPTAuNTQ1NDE1MzkzOTM3NzAxMSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjAwMjYwNzM0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9




API Key:--
46883794



SessionID:-1_MX40Njg4Mzc5NH5-MTU5NzY2ODU0NTg5MH5MdEgrTDErdmtqcDlOZWV3KzNSNUJBNkp-fg



*/
