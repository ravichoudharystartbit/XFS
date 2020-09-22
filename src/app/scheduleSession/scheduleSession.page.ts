import { Component, OnInit,ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router , NavigationExtras } from '@angular/router';
import { Storage } from "@ionic/storage";
import { QueryList, ViewChildren } from '@angular/core';

import { ServiceForAllService } from '../service-for-all.service';
import { ActionSheetController,LoadingController,AlertController,NavController , Platform } from '@ionic/angular';

@Component({
  selector: 'app-scheduleSession',
  templateUrl: 'scheduleSession.page.html',
  styleUrls: ['scheduleSession.page.scss'],
})
export class ScheduleSessionPage implements OnInit{
  

  Wishlists = [];
  loading : any;
  resData : any;
  Coaches  = [];

  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public serviceForAllService: ServiceForAllService,
  ) {

     this.storage.get("user").then((val) => {
        if (val && val != null){
           
        }
        else{
        this.router.navigate(['/login']);
        }     
      });
    }

  ngOnInit(){
    this.getAllCoaches();
  }

  ionViewWillEnter(){
    
  }
  
  
  back(){
    this.location.back();
    console.log('backkk')
  }
  
  async showLoader(){
    this.loading = await this.loadingCtrl.create({message: 'Please wait...'});
    this.loading.present();

  }
  async dismissLoading() {
    if(this.loading){
      await this.loading.dismiss();
    } 
  }

  getAllCoaches(){
    this.showLoader();
    this.Coaches = [];
    this.serviceForAllService.getAllCoaches().subscribe((result) => {
      
        this.resData = result;
        this.Coaches = this.resData.Coaches;

        console.log(this.Coaches);
        this.dismissLoading();
      }, (err) => {
        this.dismissLoading();
        let ErrorData =  err.error;
         // this.presentAlert((ErrorData.errorMsg ? ErrorData.errorMsg : 'Server Error') );
       
    }); 
    
  }

  book(){
    this.router.navigate(['/schedule']);
  }


  sendToMessage() {
    this.storage.get('user').then((val) => {
      console.log(val);
      if (val != null) {
       console.log('Current User' , val);
       return 0;

       /* this.allServices.getCurrentUserInfo(val.token).subscribe((result) => {
          this.res = result;
         
          this.openChatPage(this.res.result);
         
        }, (err) => {
        
          console.log("error...", err);
          let msg = err.error.errormsg;
         // this.allServices.presentAlert(msg);
        });
        */
        this.openChatPage(val);
      }
    });
  }

  openChatPage(Currentuser) {
    let userPro = {
    //  first_name: this.doctor_name,
    //  id: parseInt(this.doctor_id),
    //  user_img:  this.image
    };
    let navigationExtras: NavigationExtras = {
      queryParams: {
        //  special: JSON.stringify(workout),
        secondUser: JSON.stringify(userPro),
        currentUser: JSON.stringify(Currentuser),
        fromMy: true
      }
    };
    this.navCtrl.navigateForward(['/chat'], navigationExtras);
  }

}
