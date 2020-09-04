import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServiceForAllService } from '../service-for-all.service';
import { LoadingController, AlertController, NavParams, ToastController, ModalController, Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
//import { CallingdocPage } from '../callingdoc/callingdoc.page';

declare var OT: any;

@Component({
  selector: 'app-calling',
  templateUrl: './calling.page.html',
  styleUrls: ['./calling.page.scss'],
})
export class CallingPage implements OnInit {
  session: any;
  publisher: any;
  apiKey: any;
  sessionId: string;
  token: string;
  loading: any;
  archive_id: any;
  token_app: any;
  session_app: any;
  incomingData: any = [];
  ref: any;
  opposite_user_id: any;
  appointment: any;
  isIncoming: boolean = false;
  dHeight: any;
  dWidth: any;
  bigH: any;
  bigW: any;
  miniH: any;
  miniW: any;
  status: number = -1;
  opposite_pic: any = '';
  opposite_name: any = '';
  isRejected: boolean = true;
  maxTime: any = 6000;
  loding_first: boolean = true;
  loding_first_2: boolean = true;
  protected interval: any;
  user_data: any;
  recive_key: any;
  ref_doc: any;
  role: any;
  callmodal: any;
  is_recording:boolean=false;
  calling: boolean = false;
  calling_going: boolean = true;

  recordingStatus: number = 0;

  JoinUsers:any=[];
  AcceptedUsers:any=[];
  startRecording:boolean=false
  truecount:any=0;

  constructor(
    public allServices: ServiceForAllService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public storage: Storage,
    public toastController: ToastController,
    public modalCtrl: ModalController,
    private plt: Platform,
    public cdr: ChangeDetectorRef,
    private nativeAudio: NativeAudio,
  ) {
    this.calling_going = true;
    this.apiKey = '46889874';
    this.dHeight = this.plt.height() - 120;
    this.dWidth = this.plt.width() - 50;
    this.bigH = this.dHeight / 2;
    this.bigW = this.dWidth / 2;
    this.miniH = this.plt.height() - 320;
    this.miniW = this.plt.width();
    this.is_recording=false;

    this.recordingStatus = 0;

    this.plt.ready().then(() => {
        // console.log('Navparams');
      this.storage.get('user').then(val => {
        if (val != null) {

          this.role = val.role;

          this.user_data = val;

          this.ref = firebase.database().ref('call/' + val.user_id);
          if (this.ref) {
            // console.log('user: ',this.ref);
            this.ref.limitToLast(1).on('value', data1 => {
              // console.log('value:-', data1);
              if (!this.loding_first_2) {
                if (data1.val() == null) {
                  this.stopTune()
                  this.dismiss();

                }
              }
              this.loding_first_2 = false;
            });
          }

          firebase.database().ref('call/' + this.opposite_user_id).remove();
          this.ref = firebase.database().ref('call/' + this.opposite_user_id);
          if (this.ref) {
           // console.log('user2 : ',this.ref);
            this.ref.limitToLast(1).on('value', data1 => {
              if (!this.loding_first) {
               // console.log('value 2:-', data1);
                if (data1.val() == null) {
                  this.stopTune()
                  this.dismiss();
                }
              }
              this.loding_first = false;
            });
          }
        }
      }); 


     /* this.nativeAudio.preloadComplex('uniqueI1', 'assets/callertune.mp3', 1, 1, 0).then((succ) => {
        // console.log("suu", succ)
      }, (err) => {
        // console.log("err", err)
      });*/
    });

    if (navParams.get('data') && navParams.get('data') != undefined) {
      this.incomingData = JSON.parse(navParams.get('data'));
      this.isIncoming = true;
    }
    else {
      this.isIncoming = false;
    }

    if (navParams.get('user_id') && navParams.get('user_id') != undefined) {
      this.opposite_user_id = navParams.get('user_id');
      this.isIncoming = false;
    }
    else {
      this.isIncoming = true;
    }

    if (navParams.get('appointment') && navParams.get('appointment') != undefined) {
      // console.log('Appp: ', navParams.get('appointment'));
      this.appointment = navParams.get('appointment');

      this.opposite_pic = this.appointment.opposite_pic;
      this.opposite_name = this.appointment.name;

      this.isIncoming = false;
    }
    else {
      this.isIncoming = true;
    }
    
    if (this.isIncoming == true) {
      this.startTune();
       
      this.storage.get('user').then(val => {
       if (val != null) {
          this.ref = firebase.database().ref('call/' + val.user_id);
          if (this.ref) {
            this.ref.limitToLast(1).on('value', data1 => {
              let callData = {};
              // console.log('data 1 : ', data1);
              data1.forEach(data => {
                if (data.val()) {
                  this.recive_key = data.key;
                  // console.log('Recording 3 : ', data.val());
                   
                  this.opposite_pic = data.val().caller_img;
                  this.opposite_name = data.val().caller_name;

                  // if (data.val().recording == 0) {
                  //   this.presentAlertConfirm();
                  //  }

                  if (data.val().status == 0) {
                    // this.presentToast('Incoming Call.');
                  }
                  if (data.val().status == 1) {
                    this.presentToast('Call end by caller.');
                  
                    this.stopInterval('');
                    this.dismiss();
                  }
                  if (data.val().status == 2) {
                    // this.presentToast('You have accepted the call.');
                    this.stopInterval('');
                  }
                  if (data.val().status == 3) {
                    // this.presentToast('You have rejected the call.');
                    this.stopInterval('');
                  }
                  if (data.val().status == 4) {
                    // this.presentToast('You are not answering the call.');
                    this.ref.remove();
                    this.stopInterval('');
                    this.dismiss();
                  }
                
                  this.status = parseInt(data.val().status);
                  // console.log("this.status: ", this.status);
                }
              });
            });
          }
        }
        
      });
    }
    else {
      this.ref = firebase.database().ref('call/' + this.opposite_user_id);
    
        this.ref.limitToLast(1).on('value', data1 => {
          let callData = {};
          data1.forEach(data => {
            if (data.val()) {
              if (data.val().status == 0) {
                 
              }
              if (data.val().status == 1) {
                // this.presentToast('Call End.');
                this.stopInterval('');
              }
              if (data.val().status == 2) {
                // this.presentToast('Call Accepted.');
                this.stopInterval('');
                this.JoinUsers.push(this.opposite_user_id);

                // this.startArc(); 
              }
              if (data.val().status == 3) {
                this.presentToast('Call Rejected.');
                this.stopInterval('');
                this.rejectedCall();
              }
              if (data.val().status == 4) {
                // this.presentToast('Not answer');
                // this.stopInterval('');
              }

              if (data.val().recording == 1) {
                 this.AddRecordingStatus(this.opposite_user_id,true)
                 .then((data) => {
                   // console.log(data);
                   if(data.added==true){
                    this.CheckAutRecording(); 
                   }
                 }, err => {
                   // console.log(err);
                 });

              }
              this.status = parseInt(data.val().status);
              // console.log("Call Accepted By : ", this.status);
            }
          });
        });
    } 
  }


  async presentAlertConfirm() {
  
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Please allow us for recording ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.is_recording=false;
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.is_recording=false;
            // console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }





  ngOnInit() {
    this.is_recording=false;
  }

  startTune() {
    this.plt.ready().then(() => {
     /* this.nativeAudio.loop('uniqueI1').then((succ) => {
        // console.log("succ", succ)
      }, (err) => {
        // console.log("err", err)
      }); */
    });
  }

  stopTune() {
    // console.log("I am here----------------");
    /*this.nativeAudio.stop('uniqueI1').then(() => { }, () => { });*/
  }

  startTimer() {
    let i = 0;
    this.interval = setInterval(() => {
      i++;
      if (i == this.maxTime) {
        this.stopInterval("The person you are calling is not answering. Please try again later.");
      }
    }, 1000);
  }

  stopInterval(msg) {
    this.stopTune();
    if (this.interval) {
      clearInterval(this.interval);
      if (msg != '') {
        this.presentToast(msg);
        this.endCall(4);

        if (this.opposite_user_id && this.opposite_user_id != '') {
          this.storage.get('user').then((val) => {
            if (val != null) {
              this.allServices.sendMissedVideoNotification(val.user_id, this.opposite_user_id).subscribe((result) => {
                // console.log(result);
              }, (err) => {
                // console.log("error...", err);
              });

            }
          });
        }

      }
    }
  }

  async dismiss() {
  // console.log('call cancel')
    // this.stopTune();
    if (this.ref) {
      this.ref.off;
    }
    await this.modalCtrl.dismiss();
  }

  ionViewWillLeave() {
    if (this.ref) {
      this.ref.off;
    }
  }

  //Start Call
  startCall() {
  // console.log('call to users')
    this.JoinUsers=[];
    this.AcceptedUsers=[];
    let cc = this.allServices.checkNetworkConnection();
    if (cc == 'none') {
      this.presentToast("Please check your internet connection.");
    }
    else {
      if (this.opposite_user_id && this.opposite_user_id != '' && this.appointment && this.appointment != '') {

        this.startTune();
        this.startTimer();

        this.status = 0;
        // this.showLoader('Connecting...');
        this.sessionId = '';

        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).
          then((stream) => {
            this.allServices.createSession()
              .subscribe(res => {
                // this.dismissLoading();
                let res2: any = [];
                res2 = res;
                // console.log(res2);
                // console.log(res2.session_id);

                this.sessionId = res2.session_id;
                this.token = res2.token;

                // console.log(this.token);

                // "archive_id": e88d27b3-0c1f-4dc5-96d4-bf165bebad7a

                let publisherOptions = {
                  insertMode: 'append',
                  width: this.miniW,
                  height: this.miniH,
                };
                let options = {
                  width: this.bigW,
                  height: this.bigH,
                  insertMode: 'append'
                }

                this.session = OT.initSession(this.apiKey, this.sessionId);
                this.publisher = OT.initPublisher('publisher', publisherOptions);

                this.session.on({
                  streamCreated: (event: any) => {
                    // console.log(event.streams.length);
                   let len = document.getElementById("stream_other_calling")
                    if (len) {
                        document.getElementById("stream_other_calling").remove();
                    }
                    //this.session.subscribe(event.stream, 'subscriber', options);
                    for (let i = 0; i < event.streams.length; i++) {
                      //  Make sure we don’t subscribe to ourself
                      // console.log(event.streams[i]);
                      if (event.streams[i].connection.connectionId == this.session.connection.connectionId) {
                        return;
                      }
                      let div = document.createElement('div');
                      div.setAttribute('id', 'stream' + event.streams[i].streamId);
                      div.setAttribute('style', "float:left;padding: 7px;");
                      document.getElementById("subscriber_data").append(div);
                      this.session.subscribe(event.streams[i], 'stream' + event.streams[i].streamId, options);

                    }

                    if (event.streams.length == 1) {
                      let div = document.createElement('div');
                      div.setAttribute('id', 'stream_other_calling');
                      div.setAttribute('style', "float:left;padding: 7px;");
                      document.getElementById("subscriber_data").append(div);
                    }
                    // OT.updateViews();

                    // this.startArc();

                    this.recordingStatus = 1;
                  },

                  streamDestroyed: (event: any) => {
                    // console.log("streamDestroyed");
                    // console.log(`Stream ${event.stream.name} ended because ${event.reason}`);
                    //OT.updateViews();
                  },
                  sessionConnected: (event: any) => {
                    // console.log("sessionConnected");
                  }
                });

                this.session.connect(this.token, (error: any) => {
                  // console.log("session.connect");
                  if (error) {
                    // console.log(`There was an error connecting to the session ${error}`);
                    this.presentAlert("Sorry, you can not make a call right now try again later.")
                    this.dismiss();
                  } else {
                    this.storage.get('user').then(val => {
                      if (val != null) {
                        // this.ref = firebase.database().ref('call/'+this.opposite_user_id);
                        this.isIncoming = false;

                        this.calling_going = false;
                        this.session.publish(this.publisher);
                        this.ref.push({
                          caller_id: val.user_id,
                          caller_name: val.user_display_name,
                          caller_img: val.user_avatar,
                          caller_role: val.role,
                          appointment_id: 'a',
                          session_id: this.sessionId,
                          token: this.token,
                          status: 0
                        });

                      }
                    });
                  }
                });

              }, err => {
                // this.dismissLoading();
              });
          }, err => {
            this.presentAlert('getUserMedia() is not supported by your browser,so you can not work');
            this.dismiss();
          });



      }
      else {
        this.presentToast("Please try again.");
      }
    }


  }

  joinCall() {
    if (this.incomingData.token && this.incomingData.token != '' && this.incomingData.session_id && this.incomingData.session_id != '') {
      this.status = 2;
      this.token = this.incomingData.token;
      this.sessionId = this.incomingData.session_id;
      this.calling = true;
      let publisherOptions = {
        insertMode: 'append',
        width: this.miniW,
        height: this.miniH,
      };
      let options = {
        width: this.bigW,
        height: this.bigH,
        insertMode: 'append'
      }

      this.session = OT.initSession(this.apiKey, this.sessionId);
      this.publisher = OT.initPublisher('publisher', publisherOptions);
      navigator.mediaDevices.getUserMedia({ audio: true, video: true }).
        then((stream) => {
          this.session.on({
            streamCreated: (event: any) => {
              // console.log("streamCreated");
              // console.log(event.streams);
              //this.session.subscribe(event.stream, 'subscriber', options);
              //OT.updateViews();

              for (let i = 0; i < event.streams.length; i++) {
                //  Make sure we don’t subscribe to ourself
                // console.log(event.streams[i]);
                if (event.streams[i].connection.connectionId == this.session.connection.connectionId) {
                  return;
                }
                let div = document.createElement('div');
                div.setAttribute('id', 'stream' + event.streams[i].streamId);
                div.setAttribute('style', "float:left;padding:5px");
                document.getElementById("subscriber_data").append(div);
                this.session.subscribe(event.streams[i], 'stream' + event.streams[i].streamId, options);
                //document.getElementById("subscriber_data").append(div);
              }

            },
            streamDestroyed: (event: any) => {
              // console.log("streamDestroyed");
              // console.log(`Stream ${event.stream.name} ended because ${event.reason}`);
              //OT.updateViews();
            },
            sessionConnected: (event: any) => {
              // console.log("sessionConnected");
              this.session.publish(this.publisher);
              // console.log(event.streams);
            }
          });

          this.session.connect(this.token, (error: any) => {
            // console.log("session.connect");
            if (error) {
              // console.log(`There was an error connecting to the session ${error}`);
            } else {
              this.stopTune();

            }
          });

          firebase.database().ref('call/' + this.user_data.user_id + '/' + this.recive_key).update({ status: 2 });


        }, err => {
          this.presentAlert('getUserMedia() is not supported by your browser,so you can not work');
          this.dismiss();
        });
    } else {
      this.presentToast("Unable to join the call.");
    }

  }

  rejectCall() {
    this.status = 3;
    this.storage.get('user').then(val => {
      if (val != null) {
        this.ref.limitToLast(1).once('value', data1 => {
          data1.forEach(data => {
            if (data.val()) {
              // console.log('data rej 11: ', data.val());
              firebase.database().ref('call/' + val.user_id + '/' + data.key).update({ status: 3 });
            }
          });
        });
        firebase.database().ref('call/' + val.user_id).remove();
      }
    });
    this.dismiss();

  }

  rejectedCall() {
    if (this.isRejected) {
      this.isRejected = false;
      this.showLoader("");
      setTimeout(() => {
        this.dismissLoading();
        this.ref.remove();
        this.dismiss();
      }, 3000);
    }
  }

  //End Call
  endCall(st) {
    //this.showLoader("");
    this.status = st;
    if(this.session){
      this.session.disconnect();
      this.storage.get('user').then(val => {
        if (val != null) {
          firebase.database().ref('call/' + this.opposite_user_id).limitToLast(1).once('value', data1 => {
            data1.forEach(data => {
              if (data.val()) {
                // console.log('data rej 2222: ', data.val());
                firebase.database().ref('call/' + this.opposite_user_id + '/' + data.key).update({ status: st });
                firebase.database().ref('call/' + data.val().other_call).remove();
              }

            });
          });
          firebase.database().ref('call/' + this.opposite_user_id).remove();

          this.dismiss();
          this.stopTune();
        }
      });
    }
    else{
      this.storage.get('user').then(val => {
        if (val != null) {
          firebase.database().ref('call/' + this.opposite_user_id).limitToLast(1).once('value', data1 => {
            data1.forEach(data => {
              if (data.val()) {
                // console.log('data rej 2222: ', data.val());
                firebase.database().ref('call/' + this.opposite_user_id + '/' + data.key).update({ status: st });
                firebase.database().ref('call/' + data.val().other_call).remove();
              }
              if(this.session){
                this.session.disconnect();
              }
            });
          });
          firebase.database().ref('call/' + val.opposite_user_id).remove();

          this.dismiss();
          this.stopTune();

        }
      });
    }
    

    setTimeout(() => {
     // this.dismissLoading();
     if(this.session){
        this.session.disconnect();
      }
      this.ref.remove();
      this.dismiss();
    },3000);

   
  }

  endCallCallie() {
    this.status = 3;
    this.storage.get('user').then(val => {
      if (val != null) {
        this.ref.limitToLast(1).once('value', data1 => {
          data1.forEach(data => {
            if (data.val()) {
              // console.log('data rej 2222: ', data.val());
              firebase.database().ref('call/' + val.user_id + '/' + data.key).update({ status: 3 });
              firebase.database().ref('call/' + data.val().other_call).remove();
            }
          });
        });
        firebase.database().ref('call/' + val.user_id).remove();
        this.session.disconnect();
        this.dismiss();
        this.stopTune();


      }
    });


  }

  startArc() {
    // // console.log('start::::');

    // this.showLoader('Start arch...');
    this.allServices.startArc(this.sessionId, this.appointment.appointment_id,this.user_data.user_id,this.opposite_user_id)
      .subscribe(res => {
        // this.dismissLoading();
        let res2: any = [];
        res2 = res;
        // console.log(res2);
        this.archive_id = res2.archive_id;

        this.recordingStatus = 2;

      }, (err) => {
        // this.dismissLoading();
      });
  }

  endArc() {
    // console.log('end::::');

    // this.showLoader('End arch...');
    this.allServices.endArc(this.archive_id)
      .subscribe(res => {
        // this.dismissLoading();
        let res2: any = [];
        res2 = res;
        // console.log(res2);

        this.recordingStatus = 0;

      }, (err) => {
        // this.dismissLoading(); 
      });
  }

  async presentAlert(msg) {
    let alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showLoader(msg) {
    this.loading = await this.loadingCtrl.create({ message: msg });
    this.loading.present();
  }
  async dismissLoading() {
    // console.log(this.loading);
    await this.loading.dismiss();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      animated: true,
      // cssClass: "my-toast-red",
      duration: 2000
    });
    await toast.present();
  }



  async OpendocModal() {
   /* const modal = await this.modalCtrl.create({
      component: CallingdocPage,
      cssClass: 'add_users_modal_css'

    });

    modal.onDidDismiss().then((res) => {
      // // console.log(res);
      this.makeOthercall(res.data.user_id,res.data)
    });
    return await modal.present();
    */
  }

  makeOthercall(doc_id,data) {
    if (doc_id != '') {
      document.getElementById("stream_other_calling").innerHTML = "Calling.." +data.client_name;
      this.ref_doc = firebase.database().ref('call/' + doc_id);
      this.ref_doc.push({
        caller_id: this.user_data.user_id,
        caller_name: this.user_data.first_name + ' ' + this.user_data.last_name,
        caller_img: this.user_data.user_avatar,
        caller_role: this.user_data.role,
        appointment_id: this.appointment.appointment_id,
        session_id: this.sessionId,
        token: this.token,
        status: 0
      });



      this.ref_doc.on('value', data1 => {
        data1.forEach(data => {
          if (data.val()) {
            if(data.val().status==2){
              this.JoinUsers.push(doc_id);
            }
  
          if (data.val().recording == 1) {
              this.AddRecordingStatus(doc_id,true)
              .then((data) => {
                // // console.log(data);
                if(data.added==true){
                 this.CheckAutRecording(); 
                }
              }, err => {
                // // console.log(err);
              });
           }
          }    
        });
      })

      firebase.database().ref('call/' + this.opposite_user_id).limitToLast(1).once('value', data1 => {
        data1.forEach(data => {
          if (data.val()) {

            let update = firebase.database().ref('call/' + this.opposite_user_id + '/' + data.key).update({ other_call: doc_id });
            if (update) {

              // // console.log("updated");
            }
          }

        });
      });
    } else {
      return false;
    }
  }


  CheckAutRecording(){
    this.getRequest()
    .then((data) => {
      // console.log(data);
      if(data.recording==true){
         this.startArc();
      }
    }, err => {
      // console.log(err);
    });
  }

  AddRecordingStatus(user_id,sts): Promise<any> {
    return new Promise<any>((resolve) => {
      this.AcceptedUsers[user_id]=sts;  
      let d = {
        added:true
      }
      resolve(d);
    })
  }


  getRequest(): Promise<any> {
    return new Promise<any>((resolve) => {
     this.truecount=0;
     // console.log(this.JoinUsers);
     // console.log(this.AcceptedUsers);
      this.JoinUsers.forEach(element => {
        // console.log(this.AcceptedUsers[element]);
          if(this.AcceptedUsers[element]==true){
            this.truecount++;
             
          }
      })
      if(this.JoinUsers.length==this.truecount){
        let d = {
          recording:true
         }
         resolve(d);
      }else{
        let d = {
          recording:false
         }
         resolve(d);
      }
      
     
    })
  }


  RequeststartArc(){
    // console.log(this.JoinUsers);
    this.JoinUsers.forEach(element => {
         // console.log(element);
         firebase.database().ref('call/' + element).limitToLast(1).once('value', data1 => {
          data1.forEach(data => {
            if (data.val()) {
              let update = firebase.database().ref('call/' + element + '/' + data.key).update({ recording: 0 });
              if (update) {
  
                // console.log("updated");
              }
            }
          });
        });
    });
  }

}


