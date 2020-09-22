import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController, LoadingController, NavController, AlertController , ModalController } from "@ionic/angular";
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
import * as firebase from 'firebase';
import { CallingPage } from './calling/calling.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ["./app.component.scss"],
  providers: [ OpentokService ]
})
export class AppComponent implements OnInit {
public global_obj: any[] = [];
session: OT.Session;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;


  public appPages = [
   
  ];

  deferredPrompt: any;
  showInstallBtn: boolean = true;
  pwa_features: any;



  logout:any;
  userDetails:any;
  deviceData: any = [];
  webRTCClient:any;
  session_id:any;
  myCallId:any;
  user:any;
  showCall: boolean;
  showHangup: boolean;
  showAnswer: boolean;
  showReject: boolean;
  showStatus: boolean;
  showRemoteVideo: boolean = true;
  showMyVideo: boolean = true;
  ref1:any;
  incomingcalldata:any;
  is_login:boolean=false;

  onlineRef:any;

  online:any = 1;
  reciving:boolean=false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: Events,
    private storage : Storage,
    private router : Router,
    private navCtrl : NavController,
    private alertCtrl : AlertController,
    private modalController : ModalController,
    private http : HttpClient,
    private ref: ChangeDetectorRef, 
    private opentokService: OpentokService

  ) {
        this.changeDetectorRef = ref;
       // console.log('beforeinstallprompt start');
        window.addEventListener('beforeinstallprompt', (e) => {
          // console.log('beforeinstallprompt Event fired');
          // Prevent Chrome 67 and earlier from automatically showing the prompt
          e.preventDefault();
          // Stash the event so it can be triggered later.
          this.deferredPrompt = e;
          this.showInstallBtn = true;
        });
       // console.log('beforeinstallprompt end');
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
          
        });


        var firebaseConfig = {
            apiKey: "AIzaSyB2OPW8IAcSl8xDEPPF7gDcLrXFL9atKSs",
            authDomain: "xefs-fitness.firebaseapp.com",
            databaseURL: "https://xefs-fitness.firebaseio.com",
            projectId: "xefs-fitness",
            storageBucket: "xefs-fitness.appspot.com",
            messagingSenderId: "113816097680",
            appId: "1:113816097680:web:f7be6dfa84cc0755099915",
            measurementId: "G-4398GF8YCW"
          }
        console.log(firebase.initializeApp(firebaseConfig));

        this.initializeApp();

         setTimeout(() => {

        this.initiateFBOnline();

        },500);
      this.storage.get("user").then((val) => {
        // console.log(val)
        if (val && val != "") {
        this.global_obj = val;
          this.events.publish('userCheck:login', val);
          
        }
      });

      this.events.subscribe('userCheck:login', (check) => { 
      // console.log('event' , check)
      if(check.token){
        setTimeout(() => {
          this.initiateFB();
          this.initiateFBOnline();
        },500);  
      }     
    });
  }


  ngOnInit () {
    this.opentokService.initSession().then((session: OT.Session) => {
      this.session = session;
      // console.log(this.session);
      this.session.on('streamCreated', (event) => {
        this.streams.push(event.stream);
        this.changeDetectorRef.detectChanges();
      });
      this.session.on('streamDestroyed', (event) => {
        const idx = this.streams.indexOf(event.stream);
        // console.log(this.streams);
        if (idx > -1) {
          this.streams.splice(idx, 1);
          this.changeDetectorRef.detectChanges();

        }
      });
    })
    .then(() => this.opentokService.connect())
    .catch((err) => {
     // console.error(err);
     // alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
    });
  }



  initializeApp() {
    // console.log('Ready')
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      this.storage.get("user").then((val) => {
        // console.log(val)
        if (val && val != "") {
        this.appPages = [];
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
          let values3 = {
            title: 'Payment',
            url: '/payment_slide',
            icon: 'person'
          };
          let values4 = {
            title: 'Wishlist',
            url: '/wishlist',
            icon: 'heart-empty'
          };
          let filterArr  = this.appPages.filter( (x)=> x.title == 'Profile');
          if(!filterArr.length){
            this.appPages.push(values);
            this.appPages.push(values1);
            this.appPages.push(values2);
            this.appPages.push(values3);
            this.appPages.push(values4);
          }
          this.navCtrl.setDirection('root');
          this.router.navigate(['/tabs/home']);
        } else {
          
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
          let values3 = {
            title: 'Payment',
            url: '/payment_slide',
            icon: 'person'
          };
          let values4 = {
            title: 'Wishlist',
            url: '/wishlist',
            icon: 'heart-empty'
          };
          this.appPages = [];
          this.appPages.push(values);
          this.appPages.push(values1);
          this.appPages.push(values2);
          this.appPages.push(values3);
          this.appPages.push(values4);
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

  initiateFB(){
    this.storage.get('user').then(val=>{
      if(val!=null){
        this.user=val;
        this.ref1 = firebase.database().ref('call/'+val.user_id);
        if(this.ref1){
          this.ref1.limitToLast(1).on('value',data1 => {
            if(data1.val()==null){
              this.reciving=false;
            }else{
            let callData = {};
            // console.log('data 1 : ', data1);
            data1.forEach( data => {
              if(data.val()){
                // console.log('data 3 : ', data.val());
                callData = {
                  caller_id: data.val().caller_id,
                  caller_name: data.val().caller_name,
                  caller_img: data.val().caller_img,
                  caller_role: data.val().caller_role,
                  appointment_id: data.val().appointment_id,
                  session_id: data.val().session_id,
                  token: data.val().token,
                  status: data.val().status
                };
                // this.ref1.remove();
                if(callData['status']==0 && this.reciving==false ){
                     this.reciving=true;
                     this.callModal(callData);
                }

                if(data.val().recording==0){
                  this.presentAlertConfirm(data);
                }
                
              }
            });
          }
          });
        }
        else{
          // console.log("I AM IN ERROR!!");
        }
      }
    });      
  }

  async presentAlertConfirm(data) {
    this.incomingcalldata=data;
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Please allow us for recording ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            let update = firebase.database().ref('call/' + this.user.user_id + '/' + this.incomingcalldata.key).update({ recording: 2 });
            if (update) {
              // console.log('Confirm Okay');
            }
          }
        }, {
          text: 'Yes',
          handler: () => {
            let update = firebase.database().ref('call/' + this.user.user_id + '/' + this.incomingcalldata.key).update({ recording: 1 });
            if (update) {
              // console.log('Confirm Okay');
            }
           
          }
        }
      ]
    });

    await alert.present();
  }


  async callModal(callData) {
    // this.ref1.off();
    const modal = await this.modalController.create({
      component: CallingPage,
      cssClass: 'full-modal',
      componentProps: {
        "data": JSON.stringify(callData)
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
      }
    });
    return await modal.present();
  }

  initiateFBOnline(){

    console.log("M HERE");

     this.platform.ready().then(() => { 
      this.storage.get('user').then(val=>{
        if(val){
          this.onlineRef = firebase.database().ref('online_usersssss/'+val.user_id);
          if(this.onlineRef){
            this.onlineRef.push({
              online: 1
            });

             window.addEventListener('beforeunload', () => {
               this.onlineRef.remove();
             });

            // Observable.fromEvent(window, 'beforeunload').subscribe(event: Event => this.unsubscribeFromSignals());

              this.platform.pause.subscribe(async () => {
                console.log('Pause event detected');
                this.onlineRef.remove();
              });

              this.platform.resume.subscribe(async () => {
                console.log('Resume event detected');
                this.onlineRef.push({
                  online: 1
                });
              });
  
          }
          else{
            console.log("I AM IN ERROR!!");
          }
        }
      }); 
    });
  }

  showWishlist(){
    this.storage.get('wishlists').then(val=>{
      if(val){
        console.log(val);
      }
    });
    this.router.navigate(['/wishlist']);
  }


}
