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


import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
  
@Component({
  selector: "app-contact",
  templateUrl: "./contact.page.html",
  styleUrls: ["./contact.page.scss"]
})
export class ContactPage implements OnInit {
  
  slideOpts = {
    initialSlide: 0.5,
    speed: 400,
    slidesPerView : 'auto', 
    zoom: {
    toggle: false
  }
  };



  isLoading = false;
  showInput = false;
  isShow = true; 

  response: any;
  User: any;
  ResData: any;
    PersonalForm: FormGroup;
    validation_messages = {
    password: [
      { type: "required", message: "This Field is required." },
      {
        type: "minlength",
        message: "New Password must be at least 5 characters long."
      } 
    ],
    confirm_password: [
      { type: "required", message: "This Field is required." },
      {
        type: "minlength",
        message: "Confirm New Password must be at least 5 characters long."
      }     
    ],
    old_password: [
      { type: "required", message: "This Field is required." },
         
    ]
  };
  
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
    private route : ActivatedRoute,
    private http : HttpClient,
  ) {  
    
      this.PersonalForm = new FormGroup({
        password: new FormControl(
          "",
          Validators.compose([Validators.minLength(5), Validators.required])          
        ),
        confirm_password: new FormControl(
          "",
         Validators.compose([Validators.minLength(5), Validators.required])
        ),
        old_password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
          ])
        ),
      });    
  }

  ngOnInit() {
    
   }

  async showLoader(msg='Password Updating , Please wait...') {
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


  submit(){
  /*  console.log(this.PersonalForm.value);

    if(this.PersonalForm.valid){
      if(this.PersonalForm.value.password == this.PersonalForm.value.confirm_password){
          this.presentAlert('Old password and new password is same, please try diffrent.');
          return false;
      }
      if(this.PersonalForm.value.password != this.PersonalForm.value.confirm_password){
          this.presentAlert('New password and confirm new password does not match');
          return false;
      }
      this.showLoader();

      let userData = this.PersonalForm.value;

      this.storage.get("user").then((val) => {
        if (val && val != null){
          userData.user_email = val.user_email;
          this.webService.changeUserPassword(val.token , userData).subscribe(
            (result) => {
                
               this.hideLoader();
               this.presentAlert('Password changed successfully');
            },
            err => {
              let ErrorData =  err.error;
              this.hideLoader();
              this.presentAlert((ErrorData.errorMsg ? ErrorData.errorMsg : 'Server Error') );
            }
          );
        }
      });
    }
    */
  }
}