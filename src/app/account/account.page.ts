import { Component, OnInit,NgZone,ChangeDetectorRef} from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActionSheetController,LoadingController,AlertController,NavController , Platform } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { Router ,ActivatedRoute} from '@angular/router';
import { ServiceForAllService } from '../service-for-all.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
 
  user : any = {};
  Resuser : any = {};
  loading : any;
  username = 'Mark Henry';
  profilePic = '';
  cards : any = [];

  constructor( 



    private router: Router,   
    public zone:NgZone,
    public navctrl:NavController,
    public route:ActivatedRoute,
    public plt:Platform,    
    public events:Events,
    public alertCtrl:AlertController,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public serviceForAllService:ServiceForAllService,
    public actionSheetCtrl: ActionSheetController
    ) {
	     
    }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.storage.get("user").then((val) => {
      console.log(val)
      if (val && val != "") {
        this.getUserProfile(val.token);
        this.getStripeCards(val.token)
      }
    });
  }
  getUserProfile(token,imgUp=false){

    this.serviceForAllService.getUserProfileData(token).subscribe((result) => {
      this.Resuser = result; 
      this.user = this.Resuser.user; 
      this.profilePic = this.user.userImage;

    }, (err) => {

     
  }); 
    
  } 

  async presentAlert(msg,type:boolean=false){
    if(!type){
    let alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }else{
    let alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: [
      { 
          text: 'OK',
          handler: () => {
            this.events.publish('refresh','saved');
          }
        }
      ]
    });
  
    await alert.present(); 
  }
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



 
  gotoChangePassword(){
    this.navctrl.navigateForward(['/change_password']);    
  }

  getStripeCards(token){
    this.showLoader();
    this.serviceForAllService.getStripeCards(token).subscribe(
      (resp: any) => {
        console.log(resp);

        if(resp.cards.data.length > 0){
          console.log(resp.cards.data.length);
          this.cards = resp.cards.data;
        }
        this.dismissLoading();
      },
      (err) => {
       this.dismissLoading();
       console.log(err);
        //return this.presentAlert('Server Error');
      }
    );
  }
}