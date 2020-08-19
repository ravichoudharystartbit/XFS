import { Component, OnInit , ViewChild } from "@angular/core";
import {
  AlertController,
  LoadingController,
  NavController,
  MenuController
} from "@ionic/angular";
import { ServiceForAllService } from '../service-for-all.service';
import { Storage } from "@ionic/storage";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  ReactiveFormsModule
} from "@angular/forms";
import { Router ,NavigationExtras,ActivatedRoute} from "@angular/router";
  
@Component({
  selector: "app-signup_option_step2",
  templateUrl: "./signup_option_step2.page.html",
  styleUrls: ["./signup_option_step2.page.scss"]
})
export class SignupOptionStep2Page implements OnInit {
  loginForm: FormGroup;
  response: any;
  isLoading = false;
  isShow = true;
  deviceToken: any;
  deviceData: any = [];

  validation_messages = {
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Enter a valid email." }
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 5 characters long."
      }
    ]
  };
  title = 'Angular7-readCSV';  
  
  public records: any[] = [];   
  constructor(
    public storage: Storage,
    public navCtrl:NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navController: NavController,
    public webService: ServiceForAllService,
    private router: Router,
    private route: ActivatedRoute,
    public menu: MenuController,
  ) {


  this.storage.get("user").then((val) => {
          if (val && val != null){
             this.router.navigate(['/tabs/home']);
          }
       
      });

    
    this.menu.swipeEnable(false);
    this.loginForm = new FormGroup({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });
  }

  ngOnInit() {
    
   }

  doLogin() {
   
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.showLoader();
    this.webService.verifyEmail(email).subscribe(
      (result) => {   
      this.hideLoader();    
        this.response = result; 

        let navigationExtras: NavigationExtras = {
        queryParams: {
          'email' : email, 
          'password' : password, 
          'OTP' : this.response.OTP, 
          'type' : this.route.snapshot.queryParamMap.get('type'), 
        } 
      };
      this.router.navigate(['verify_email'] , navigationExtras);       
      },
      err => {
        this.hideLoader();
        this.presentAlert("Email alreay exist.");
      }
    );  
   
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
 


}