import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ServiceForAllService } from '../service-for-all.service';
import { LoadingController,AlertController } from '@ionic/angular';
import * as firebase from 'firebase';

declare var OT:any;

@Injectable({
  providedIn: 'root'
})
export class TokboxService {
  session: any;
  publisher: any;
  apiKey: any;
  sessionId: string;
  token: string;
  loading:any;
  archive_id:any;
  token_app:any;
  session_app:any;
  ref:any;

  constructor(
    public allServices:ServiceForAllService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) { 
    this.apiKey = '46503392';

    
  }

  startCall() {
    this.showLoader('');
      this.allServices.createSession()
        .subscribe(res => {
          this.dismissLoading();
          let res2:any = [];
          res2 = res;
          console.log(res2);
          console.log(res2.session_id);

          this.sessionId = res2.session_id;
          this.token = res2.token;

          console.log(this.token);

                              this.session = OT.initSession(this.apiKey, this.sessionId);
                              this.publisher = OT.initPublisher('publisher');

                              this.session.on({
                                streamCreated: (event: any) => {
                                  console.log("streamCreated");
                                  this.session.subscribe(event.stream, 'subscriber');
                                  OT.updateViews();
                                },
                                streamDestroyed: (event: any) => {
                                  console.log("streamDestroyed");
                                  console.log(`Stream ${event.stream.name} ended because ${event.reason}`);
                                  OT.updateViews();        
                                },
                                sessionConnected: (event: any) => {
                                  console.log("sessionConnected");
                                  this.session.publish(this.publisher);
                                }
                              });

                              this.session.connect(this.token, (error: any) => {
                                console.log("session.connect");
                                if (error) {
                                  console.log(`There was an error connecting to the session ${error}`);
                                }
                              });

              // this.ref = firebase.database().ref('/'+screen);
              // let time = Date.now();
              // this.ref.push({
              //   caller_id: '',
              //   caller_name:time,
              //   caller_img:'',
              //   caller_role: '',
              //   appointment_id:'',
              //   session_id:'',
              //   token:''
              // });


        },err=>{this.dismissLoading();});
  }

  joinCall(){
    this.token = this.token_app;
    this.sessionId = this.session_app;

    this.session = OT.initSession(this.apiKey, this.sessionId);
    this.publisher = OT.initPublisher('publisher');

    this.session.on({
      streamCreated: (event: any) => {
        console.log("streamCreated");
        this.session.subscribe(event.stream, 'subscriber');
        OT.updateViews();
      },
      streamDestroyed: (event: any) => {
        console.log("streamDestroyed");
        console.log(`Stream ${event.stream.name} ended because ${event.reason}`);
        OT.updateViews();        
      },
      sessionConnected: (event: any) => {
        console.log("sessionConnected");
        this.session.publish(this.publisher);
      }
    });

    this.session.connect(this.token, (error: any) => {
      console.log("session.connect");
      if (error) {
        console.log(`There was an error connecting to the session ${error}`);
      }
    });
  }

  endCall(){
    this.session.disconnect();
    // this.showLoader('');
    //   this.allServices.endSession(this.sessionId)
    //     .subscribe(res => {
    //       this.dismissLoading();
    //       let res2:any = [];
    //       res2 = res;
    //       console.log(res2);
         

    //     },err=>{this.dismissLoading();});
  }

  startArc(){
    console.log('start::::');

    this.showLoader('Start arch...');
      this.allServices.startArc(this.sessionId,'','','')
        .subscribe(res => {
          this.dismissLoading();
          let res2:any = [];
          res2 = res;
          console.log(res2);
          this.archive_id = res2.archive_id;
        },err=>{this.dismissLoading();});
  }


  endArc(){
    console.log('end::::');

    this.showLoader('End arch...');
      this.allServices.endArc(this.archive_id)
        .subscribe(res => {
          this.dismissLoading();
          let res2:any = [];
          res2 = res;
          console.log(res2);

        },err=>{this.dismissLoading();});
  }

  async presentAlert(msg) {
    let alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  
  async showLoader(msg){
    this.loading = await this.loadingCtrl.create({message: msg});
    this.loading.present();
  }
  async dismissLoading() {
    console.log(this.loading);
    await this.loading.dismiss();
  }
}
