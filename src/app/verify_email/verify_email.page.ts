import { Component, OnInit , ViewChild } from "@angular/core";
import {
  AlertController,
  LoadingController,
  NavController,
  MenuController
} from "@ionic/angular";
import { ServiceForAllService } from '../service-for-all.service';
import { Storage } from "@ionic/storage";
import { Events } from "@ionic/angular";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  ReactiveFormsModule
} from "@angular/forms";
import { Router,ActivatedRoute ,NavigationExtras } from "@angular/router";
  
@Component({
  selector: "app-verify_email",
  templateUrl: "./verify_email.page.html",
  styleUrls: ["./verify_email.page.scss"]
})
export class VerifyEmailPage implements OnInit {

  isLoading = false;
  isShow = true; 
  
  Email = '';
  OTP = '';
  verifyOTP = '';
  
  constructor(
    public storage: Storage,
    public navCtrl:NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navController: NavController,
    public webService: ServiceForAllService,
    public events: Events,
    private router: Router,
    public menu: MenuController,
    private route : ActivatedRoute
  ) {
    this.Email = this.route.snapshot.queryParamMap.get('email')
    this.OTP = this.route.snapshot.queryParamMap.get('OTP')
  }

  ngOnInit() {
    
   }

  async showLoader() {
    this.isLoading = true;
    return await this.loadingCtrl
      .create({
        message: "Please wait...",
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


  onOtpChange(event){
    this.verifyOTP = event;
    if(event.length == 4 && event != this.OTP.toString()){
      this.presentAlert('OTP not match, please try again!')
    }
  }

  formSubmit(){

    if(this.verifyOTP.length != 4){
      this.presentAlert('Please enter OTP');
      return false;
    }
    else{     
       if(this.verifyOTP.length == 4 && this.verifyOTP != this.OTP.toString()){
        this.presentAlert('OTP not match, please try again!');
        return false;
      }
    }

      let navigationExtras: NavigationExtras = {
        queryParams: {
          'email' : this.route.snapshot.queryParamMap.get('email'), 
          'password' : this.route.snapshot.queryParamMap.get('password'), 
          'type' : this.route.snapshot.queryParamMap.get('type'), 
        } 
      };

      this.router.navigate(['persional_info'] , navigationExtras);
      
  }
  


}