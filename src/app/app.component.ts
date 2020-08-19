import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController, LoadingController, NavController, AlertController } from "@ionic/angular";
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Events } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { OpentokService } from './opentok.service';
import * as OT from '@opentok/client';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ["./app.component.scss"],
  providers: [ OpentokService ]
})
export class AppComponent implements OnInit {

session: OT.Session;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;


  public appPages = [
   
  ];

  deferredPrompt: any;
  showInstallBtn: boolean = true;
  pwa_features: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: Events,
    private storage : Storage,
    private router : Router,
    private navCtrl : NavController,
    private alertCtrl : AlertController,
    private http : HttpClient,
    private ref: ChangeDetectorRef, 
    private opentokService: OpentokService

  ) {
    this.changeDetectorRef = ref;
    console.log('beforeinstallprompt start');
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt Event fired');
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      this.showInstallBtn = true;
    });
    console.log('beforeinstallprompt end');
   this.http.get(environment.dataFileUrl+'/assets/data.json')
    .subscribe(
      res => this.pwa_features = res["pwa_features"]
    )

    if(this.deferredPrompt === undefined){
      this.showInstallBtn = false;
    }

  this.events.subscribe('menu', (value) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      let filterArr  = this.appPages.filter( (x)=> x.title == value.title);
          if(!filterArr.length){
            this.appPages.push(value);
          }
      // this.appPages.push(value);
    });
    this.initializeApp();
  }


  ngOnInit () {
    this.opentokService.initSession().then((session: OT.Session) => {
      this.session = session;
      console.log(this.session);
      this.session.on('streamCreated', (event) => {
        this.streams.push(event.stream);
        this.changeDetectorRef.detectChanges();
      });
      this.session.on('streamDestroyed', (event) => {
        const idx = this.streams.indexOf(event.stream);
        console.log(this.streams);
        if (idx > -1) {
          this.streams.splice(idx, 1);
          this.changeDetectorRef.detectChanges();

        }
      });
    })
    .then(() => this.opentokService.connect())
    .catch((err) => {
      console.error(err);
      alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
    });
  }



  initializeApp() {
    console.log('Ready')
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      this.storage.get("user").then((val) => {
        console.log(val)
        if (val && val != "") {
          this.statusBar.backgroundColorByHexString('#2973fb');
          this.statusBar.styleBlackOpaque();
          let values = {
            title: 'Home',
            url: '/tabs/home',
            icon: 'home'
          };
          let values1 = {
            title: 'Coaches',
            url: '/tabs/coaches',
            icon: 'person'
          };
          let values2 = {
            title: 'Clients',
            url: '/tabs/clients',
            icon: 'person'
          };
          let filterArr  = this.appPages.filter( (x)=> x.title == 'Profile');
          if(!filterArr.length){
            this.appPages.push(values);
            this.appPages.push(values1);
            this.appPages.push(values2);
          }
          this.navCtrl.setDirection('root');
          this.router.navigate(['/tabs/home']);
        } else {
          let values = {
            title: 'coach',
            url: '/tabs/coach',
            icon: 'person'
          };
          this.appPages = [];
          this.appPages = [values];
          this.navCtrl.setDirection('root');
          this.router.navigate(['/login']);
        }
      });
    });


  }

  async doLogout() {

    this.storage.get("user").then((val) => {
      if (val && val != "") {
        this.showAlert();
      } else {
        let values = {
          title: 'Compass',
          url: '/canvas-demo',
          icon: 'person'
        };
        this.appPages = [values];
        this.navCtrl.setDirection('root');
        this.router.navigate(['/login']);
      }
    });

  }
  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: "Logout",
      message: "Are you sure to logout?",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.events.publish('userLogoutApp', false);
            this.storage.clear();
            setTimeout(()=>{
              this.navCtrl.setDirection('root');
              this.router.navigate(['/login']);
            },200)
            
            
          }
        },
        {
          text: "No",
          role: "cancel",
          handler: () => { }
        }
      ],
      cssClass: "comment-alert"
    });

    await alert.present();
  }
}
