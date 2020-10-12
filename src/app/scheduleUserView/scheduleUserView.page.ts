import { Component, OnInit,ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router , NavigationExtras , ActivatedRoute} from '@angular/router';
import { Storage } from "@ionic/storage";
import { QueryList, ViewChildren } from '@angular/core';

import { ServiceForAllService } from '../service-for-all.service';
import { ActionSheetController,LoadingController,AlertController,NavController , Platform } from '@ionic/angular';

@Component({
  selector: 'app-scheduleUserView',
  templateUrl: 'scheduleUserView.page.html',
  styleUrls: ['scheduleUserView.page.scss'],
})
export class ScheduleUserViewPage implements OnInit{
  

  Wishlists = [];
  loading : any;
  resData : any;
  User : any;
  Coaches  = [];
  role = '';
  res:any;

  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
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
    this.route.queryParams.subscribe((params)=>{
      if(params && params.user){
        this.User = JSON.parse(params.user);
      }

    })
    
  }

  ionViewWillEnter(){
    
  }
  
  
  back(){
   this.router.navigate(['/scheduleSession']);
    //this.location.back();
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

  

  book(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        trainer_id : this.User.ID
      }
    };
    this.router.navigate(['/schedule'] , navigationExtras);
  }


  sendToMessage(user) {
    this.showLoader();
    this.storage.get('user').then((val) => {
      console.log(val);
      if (val != null) {
       console.log('Current User' , val , user);
        this.serviceForAllService.getCurrentUserInfo(val.token).subscribe((result) => {
          this.res = result;
         this.dismissLoading();
          this.openChatPage(this.res.result , user);
         
        }, (err) => {
          this.dismissLoading();
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
