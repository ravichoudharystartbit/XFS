import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router,ActivatedRoute ,NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";
import { QueryList, ViewChildren } from '@angular/core';
import { ActionSheetController,LoadingController,AlertController,NavController , Platform } from '@ionic/angular';
import { ServiceForAllService } from '../../service-for-all.service';

@Component({
  selector: 'app-nutritionRecoveryJournal',
  templateUrl: 'nutritionRecoveryJournal.page.html',
  styleUrls: ['nutritionRecoveryJournal.page.scss'],
})
export class NutritionRecoveryJournalPage implements OnInit{
  deferredPrompt: any;
  showInstallBtn: boolean = true;
  pwa_features: any;

  slideOpts = {
    initialSlide: .5,
    speed: 400
  };

  resData: any ;
  Entries = [];

isLoading = false; 

today = new Date()
yesterday = new Date(this.today)
tomorrow = new Date(this.today)

nutritions = [];  

  constructor(
    private http: HttpClient,
    private router: Router,
    public storage: Storage,
    public location: Location,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public serviceForAllService: ServiceForAllService,
  ) {

  this.yesterday.setDate(this.yesterday.getDate() - 1)
  this.tomorrow.setDate(this.today.getDate() + 1)

    this.nutritions = [
    { date: this.today , sleep : 20 , calories : 1050 },
    { date: this.yesterday , sleep : 5 , calories : 680 },
    { date: this.tomorrow , sleep : 18 , calories : 450 },
  ];  

    }

  ngOnInit(){
    
  }

 ionViewWillEnter(){
    this.Entries = [];
    this.getEntries();
  }

  search(){
    console.log('search');
  }


goTo(){
  console.log('next');

  
}

 async presentAlert(msg) {
    let alert = await this.alertCtrl.create({
      header: "Alert",
      message: msg,
      buttons: ["OK"]
    });
    await alert.present();
  }

  async hideLoader() {
    this.isLoading = false;
    return await this.loadingCtrl
      .dismiss()
      .then(() => {});
  }

  async showLoader(msg='Please wait...') {
    this.isLoading = true;
    return await this.loadingCtrl
      .create({
        message:msg,
        cssClass: "custom-load"
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => {});
          }
        });
      });
  }

  back(){
    //this.location.back();
    this.router.navigate(['/tabs/home'])
    console.log('backkk')
  }

  newEntry(){
    this.router.navigate(['/tabs/new_entry']);
  }

  getEntries(){
    this.showLoader();
    this.storage.get("user").then((val) => {
      if (val && val != null){
        this.serviceForAllService.get_journal_entry(val.token).subscribe(
          (result) => {
            this.resData = result;
            this.Entries = this.resData.Entries;
            this.hideLoader();
          },
          err => {
            this.hideLoader();
            this.presentAlert((err.errorMsg ? err.errorMsg : 'Server Error') );
          }
        );
      }
    });
  }

}
