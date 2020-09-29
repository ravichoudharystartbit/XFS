import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";
import { ServiceForAllService } from '../service-for-all.service';

import Player from '@vimeo/player';
import { MenuController, LoadingController,AlertController, NavController, ModalController, ToastController, ActionSheetController } from '@ionic/angular';
import { CallingPage } from '../calling/calling.page';
import * as firebase from 'firebase';
import { IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  deferredPrompt: any;
  showInstallBtn: boolean = true;
  pwa_features: any;

  slideOpts = {
    initialSlide: .5,
    speed: 400
  };
  @ViewChild('mySlider')  slides: IonSlides;
  slideOpts1 = {   
    initialSlide: 0.5, 
    spaceBetween:5,
    slidesPerView : 'auto', 
    zoom: {
      toggle: false
    }
};
olUsers = [];
OnlineUsers = [];
  onlineUsersRef: any;
  resData: any;

public primaryYAxis: Object = {
        lineStyle: { color: 'red' },
    };

public data: object[] = [
        { xval: 1, yval: 1009 },
        { xval: 2, yval: 2026 },
        { xval: 3, yval: 1043 },
        { xval: 4, yval: 3100 },
        { xval: 5, yval: 2126 },
        { xval: 6, yval: 4151 },
        { xval: 7, yval: 3176 },
        { xval: 8, yval: 5201 },
        { xval: 9, yval: 4226 },
        { xval: 10, yval: 2250 },
    ];

    public data1: object[] = [
        { xval: 1, yval: 4009 },
        { xval: 2, yval: 2026 },
        { xval: 3, yval: 5043 },
        { xval: 4, yval: 3100 },
        { xval: 5, yval: 6126 },
        { xval: 6, yval: 4151 },
        { xval: 7, yval: 9176 },
        { xval: 8, yval: 5201 },
        { xval: 9, yval: 2226 },
        { xval: 10, yval: 8250 },
    ];

    public data2: object[] = [
        { xval: 1, yval: 1089 },
        { xval: 2, yval: 5026 },
        { xval: 3, yval: 2043 },
        { xval: 4, yval: 3100 },
        { xval: 5, yval: 6126 },
        { xval: 6, yval: 4151 },
        { xval: 7, yval: 9176 },
        { xval: 8, yval: 5201 },
        { xval: 9, yval: 9226 },
        { xval: 10, yval: 3250 },
    ];
  

  constructor(
    private http: HttpClient,
    private router: Router,
    public storage: Storage,
    public webService: ServiceForAllService,
    public modalController: ModalController,
    public menu: MenuController,
  ) {

     this.storage.get("user").then((val) => {
          if (val && val != null){
             console.clear()
             this.menu.enable(true);
          }
          else{
          this.router.navigate(['/login']);
          }
       
      });

 

      this.checkOnline();

    }

  ngOnInit(){

  }

  ionViewWillEnter() {

  }
  search(){
  }


  checkOnline() {
    this.onlineUsersRef = firebase.database().ref('online_users');
    if (this.onlineUsersRef) {
       this.onlineUsersRef.on('value',  (res) => {
        this.olUsers = [];
         res.forEach((data) => {
          if (data.val()) {
            if (data.key && data.key != '') {
              this.storage.get("user").then((val) => {
                if (val && val != null){

                  if(val.user_id != data.key){
                    this.olUsers.push(data.key);
                    
                    this.getUserData(data.key);
                  }
                }
                });
            }
          }
        });       
      })
      
    }
    
  }

  getUserData(userId){
     this.webService.getUserData(userId).subscribe((result) => {
        this.resData = result;
        let index = this.OnlineUsers.findIndex(x=> x.user_id == this.resData.user.user_id);
        if(index == -1){
          this.OnlineUsers.push(this.resData.user);
        }
      }, (err) => {                
             
    }); 
  }

  callUser(user){
  }

  purchase(){
    this.router.navigate(['/payment_slide']);
  }

  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
  }

}
