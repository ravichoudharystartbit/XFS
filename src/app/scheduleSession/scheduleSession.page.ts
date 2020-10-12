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
  role = '';
  res:any;

  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public serviceForAllService: ServiceForAllService,
  ) {

     this.storage.get("user").then((val) => {
        if (val && val != null){
           this.role = val.type;
        }
        else{
        this.router.navigate(['/login']);
        }     
      });
    }

  ngOnInit(){
    
  }

  ionViewWillEnter(){
    this.storage.get("user").then((val) => {
        if (val && val != null){
           if(val.type == "Athlete"){
            this.getAllCoaches();
           }
           else{
            this.getAllAthletes();           
           }
        }
        else{
        this.router.navigate(['/login']);
        }     
      });
    
  }
  
  
  back(){
    this.router.navigate(['/tabs/home']);    
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
        this.dismissLoading();
      }, (err) => {
        this.dismissLoading();
        let ErrorData =  err.error;
         // this.presentAlert((ErrorData.errorMsg ? ErrorData.errorMsg : 'Server Error') );
       
    }); 
    
  }


  getAllAthletes(){
    this.showLoader();
    this.Coaches = [];
    this.serviceForAllService.getAllAthletes().subscribe((result) => {
      
        this.resData = result;
        this.Coaches = this.resData.Coaches;
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

  view(user){
    let navigationExtras: NavigationExtras = {
      queryParams: {
       user : JSON.stringify(user)
      }
    };
    //this.navCtrl.navigateForward(['/chat'], navigationExtras);
     this.router.navigate(['/scheduleUserView'] , navigationExtras);
  }


  sendToMessage(user) {
    this.storage.get('user').then((val) => {
      console.log(val);
      if (val != null) {
        console.log('Current User' , val , user);
        this.serviceForAllService.getCurrentUserInfo(val.token).subscribe((result) => {
          this.res = result;         
          this.openChatPage(this.res.result , user);         
        }, (err) => {        
          console.log("error...", err);
          let msg = err.error.errormsg;
         // this.allServices.presentAlert(msg);
        });
        
      }
    });
  }

  openChatPage(Currentuser , user) {
    let userPro = {
      first_name: user.name,
      id: parseInt(user.ID),
      user_img:  user.profilePic
    };
    let navigationExtras: NavigationExtras = {
      queryParams: {
        //  special: JSON.stringify(workout),
        secondUser: JSON.stringify(userPro),
        currentUser: JSON.stringify(Currentuser),
        fromMy: true
      }
    };
    //this.navCtrl.navigateForward(['/chat'], navigationExtras);
     this.router.navigate(['/chat'] , navigationExtras);
  }

}
