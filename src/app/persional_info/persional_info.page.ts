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
  selector: "app-persional_info",
  templateUrl: "./persional_info.page.html",
  styleUrls: ["./persional_info.page.scss"]
})
export class PersionalInfoPage implements OnInit {

  isLoading = false;
  isShow = true; 
  
  Email = '';
  OTP = '';
  verifyOTP = '';
  response: any;
    PersonalForm: FormGroup;
    validation_messages = {
    name: [
      { type: "required", message: "This Field is required." },
    ],
    DOB: [
      { type: "required", message: "This Field is required." },      
    ],
    phone: [
      { type: "required", message: "This Field is required." },      
    ],
    sports: [
      { type: "required", message: "This Field is required." },      
    ],
    choice: [
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
    private route : ActivatedRoute
  ) {
    


    this.PersonalForm = new FormGroup({
      name: new FormControl(
        "",
        Validators.compose([
          Validators.required,
        ])
      ),
      DOB: new FormControl(
        "",
        Validators.compose([
          Validators.required,
        ])
      ),
      phone: new FormControl(
        "",
        Validators.compose([
          Validators.required,
        ])
      ),
      sports: new FormControl(
        "",
        Validators.compose([
          Validators.required,
        ])
      ),
      choice: new FormControl(
        "",
        Validators.compose([
          Validators.required,
        ])
      ),
    });
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


  submit(){
    console.log(this.PersonalForm.value);

    if(this.PersonalForm.valid){
      this.showLoader();

      let userData = this.PersonalForm.value;

      userData.email = this.route.snapshot.queryParamMap.get('email')
      userData.password = this.route.snapshot.queryParamMap.get('password')
      userData.type = this.route.snapshot.queryParamMap.get('type')
      this.webService.createNewUser(userData).subscribe(
        (result) => {
          this.hideLoader();
          this.response = result;
          this.doLogin(userData.email , userData.password);
          
        },
        err => {
          this.hideLoader();
          this.presentAlert((err.errorMsg ? err.errorMsg : 'Server Error') );
        }
      );
    }
    else{
      this.presentAlert('Please fill form fields.' );
    }
  }

  doLogin(email,password) {
    this.showLoader();
    this.webService.doLogin(email, password).subscribe(
      (result) => {
      
        this.response = result;
        if (this.response.token) {
          this.storage.set("user", this.response);
          this.events.publish('userCheck:login', this.response);
          this.storage.set("user_profile", this.response);
          this.hideLoader();
          this.navCtrl.setDirection('root');
          this.router.navigate(['/instructions']);
        }
        this.hideLoader();
      },
        err => {
          this.hideLoader();
          this.presentAlert((err.errorMsg ? err.errorMsg : 'Server Error') );
        }
      );
    }

  
  


}