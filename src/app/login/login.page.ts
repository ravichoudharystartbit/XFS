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
import { Router } from "@angular/router";
  
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
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
  passwordType:string = 'password'
  public records: any[] = [];   
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
  ) {


      this.storage.get("user").then((val) => {
        if (val && val != null){
           this.router.navigate(['/tabs/home']);
        }       
      });

    
    //this.menu.swipeEnable(false);
    this.menu.enable(false);
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
    this.events.publish('userLogoutApp', false);
  }

  ngOnInit() {
    
   }

  doLogin() {
   
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.showLoader();
    this.webService.doLogin(email, password).subscribe(
      (result) => {
        
        this.response = result;
        if (this.response.token) {
          this.storage.set("user", this.response);
            
          this.events.publish('userCheck:login', this.response);
          let values=    {
            title: 'Profile',
            url: '/profile',
            icon:'person'
          };
          //this.events.publish('menu', values);
          this.storage.set("user_profile", this.response);
          this.hideLoader();
          this.navCtrl.setDirection('root');
          this.router.navigate(['/tabs/home']);
        }
      },
      err => {
        this.hideLoader();
        this.presentAlert("Username or password is invalid");
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
            a.dismiss().then(() => {
                console.log('dismiss');
            });
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
      .then(() => {
      console.log('dismiss');
      });
  }

  viewPassword(){
    console.log('view password')
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }
}