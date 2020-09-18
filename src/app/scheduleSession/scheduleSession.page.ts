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

}
