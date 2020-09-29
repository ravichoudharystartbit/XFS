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
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 
  user : any = {};
  Resuser : any = {};
  loading : any;
  username = 'Mark Henry';
  profilePic = '';

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
      }
    });
  }
  getUserProfile(token,imgUp=false){
    this.showLoader();
    this.serviceForAllService.getUserProfileData(token).subscribe((result) => {
      this.Resuser = result; 
      this.user = this.Resuser.user; 
      this.profilePic = this.user.userImage;
      this.dismissLoading();
      this.events.publish('userProfile',  this.user);
         
         if(imgUp){
          this.presentAlert('Profile Image Uploaded Successfully');
         }
    }, (err) => {
      this.dismissLoading();
     
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

 
  goToeditProfile(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        userDetails:JSON.stringify(this.user),
      }
    };
    this.navctrl.navigateForward(['/editprofile'],navigationExtras);
    
  }

 
  gotoChangePassword(){
    this.navctrl.navigateForward(['/change_password']);    
  }


  editProfile(){
    console.log('edit');

    let navigationExtras: NavigationExtras = {
      queryParams: {
        user:JSON.stringify(this.user),
      }
    };
    this.navctrl.navigateForward(['/editprofile'],navigationExtras);
  }
  abouts(){
    console.log('abouts');
  }

  goToMessageList(){
    this.navctrl.navigateForward(['/messages']);  
  }
}