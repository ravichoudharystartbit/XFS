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
  selector: 'app-coachProfile',
  templateUrl: './coachProfile.page.html',
  styleUrls: ['./coachProfile.page.scss'],
})
export class CoachProfilePage implements OnInit {
 
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
        this.getUserProfile(this.route.snapshot.queryParamMap.get('id'));
      }
    });
  }
  getUserProfile(id,imgUp=false){
    this.showLoader();
    this.serviceForAllService.getUserById(id).subscribe((result) => {
      this.Resuser = result; 
      this.user = this.Resuser.user; 
      this.profilePic = this.user.userImage;
      this.dismissLoading();
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

  goToChat(){
  this.storage.get("user").then((val) => {
      console.log(val)
      if (val && val != "") {
        let userPro = {
        id: val.user_id,
        first_name: val.user_display_name, 
        display_name: val.user_display_name, 
        user_img: val.user_image,
      };
    let navigationExtras: NavigationExtras = {
      queryParams: {
        //  special: JSON.stringify(workout),
        secondUser: JSON.stringify(this.user),
        currentUser: JSON.stringify(userPro),
        fromMy: true
      }
    };
    console.log(userPro,'user', this.user);
    this.navctrl.navigateForward(['/chat'], navigationExtras);
      }
    });
    
  }
}