import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";
import { ServiceForAllService } from '../service-for-all.service';

import Player from '@vimeo/player';
import { MenuController, LoadingController,AlertController, NavController, ModalController, ToastController, ActionSheetController } from '@ionic/angular';
import { CallingPage } from '../calling/calling.page';

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

  slideOpts1 = {   
    initialSlide: 0.5, 
    spaceBetween:5,
    slidesPerView : 'auto', 
    zoom: {
      toggle: false
    }
};

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
  ) {

     this.storage.get("user").then((val) => {
          if (val && val != null){
             
          }
          else{
          this.router.navigate(['/login']);
          }
       
      });

 
     /*  const player = new Player('handstick', {
          id: 76979871,
          width: 640
      });
       
     player.on('play', function() {
          console.log('played the video!');
      });*/

    }

  ngOnInit(){
    this.webService.getVideos().subscribe(
        (result) => {
          console.log(result);
          
        },
        err => {
         
        }
      );
  }
  search(){
    console.log('search');
    this.makeVCall(18, 'a');
  }

  async makeVCall(user_id, a) {
    console.log("a: ", a);
    const modal = await this.modalController.create({
      component: CallingPage,
      cssClass: 'full-modal',
      componentProps: {
        "user_id": user_id,
        "appointment": {
          'id' : 'a',
          'name' : 'Support'
        }
      }
    });
  
    modal.onDidDismiss().then((dataReturned) => { 
      if (dataReturned !== null) {
        // this.dataReturned = dataReturned.data;
        // //alert('Modal Sent Data :'+ dataReturned);
      }
    });
  
    return await modal.present();
  }


}
