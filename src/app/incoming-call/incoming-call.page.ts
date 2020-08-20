import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, AlertController, NavController, } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

// declare var apiRTC: any
declare var apiRTC;

@Component({
  selector: 'app-incoming-call',
  templateUrl: './incoming-call.page.html',
  styleUrls: ['./incoming-call.page.scss'],
})
export class IncomingCallPage {
  webRTCClient;
  incomingCallId:any;

  callanswered:any;
  constructor(
    private nativeAudio: NativeAudio,
    private platform: Platform,
    public alertCtrl: AlertController, 
    public loadingController: LoadingController, 
    public navController: NavController,
    public route: ActivatedRoute,
    public menu:MenuController
  ) { 
    this.route.params.subscribe(data => {
      if (data) {
        this.incomingCallId = data.incomingCallId;  
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {

    this.menu.enable(true);


    console.log('ionViewDidLoad IncomingcallPage');

    this.webRTCClient = apiRTC.session.createWebRTCClient({
      status: "status" //it is Optionnal
    });

    console.log('webRTCClient: ', this.webRTCClient);

    apiRTC.addEventListener("remoteStreamAdded", (e) => {
      console.log("Hello World!! I came here buddy");

      this.webRTCClient.addStreamInDiv(e.detail.stream, e.detail.callType, "remote", 'remoteElt-' + e.detail.callId, {
        width: "100%",
        height: "100%"
      }, false);
    })

    apiRTC.addEventListener("userMediaSuccess", (e) => {
      //this.showStatus = true;
      //this.showMyVideo = true;

      console.log("here my: ", e);

      this.webRTCClient.addStreamInDiv(e.detail.stream, e.detail.callType, "mini", 'miniElt-' + e.detail.callId, {
        width: "128px",
        height: "96px"
      }, true);

    });

    apiRTC.addEventListener("hangup", (e) => {
      this.RemoveMediaElements(e.detail.callId);
    });
    
  }

  RemoveMediaElements(callId) {
    this.webRTCClient.removeElementFromDiv('mini', 'miniElt-' + callId);
    this.webRTCClient.removeElementFromDiv('remote', 'remoteElt-' + callId);
  }

  HangUp(){
    console.log("Incoming Call Id="+this.incomingCallId);
    //this.webRTCClient.hangUp(this.incomingCallId);
    this.RemoveMediaElements(this.incomingCallId);
    this.webRTCClient.refuseCall(this.incomingCallId);
    // this.navCtrl.setRoot(CallusersPage);
  }

}
