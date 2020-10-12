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
  renderForm = false;
  Coaches = [];
  resData : any;


  isLoading = false;
  showInput = false;
  isShow = true; 

  response: any;
  User: any;
  ResData: any;
    PersonalForm: FormGroup;
    validation_messages = {
    user: [
      { type: "required", message: "This Field is required." },
    ],
    name: [
      { type: "required", message: "This Field is required." },    
    ],
    email: [
      { type: "required", message: "This Field is required." },         
    ],
    message: [
      { type: "required", message: "This Field is required." },         
    ],
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
    
      this.storage.get('user').then((val) => {
        console.log('val' , val);
        if (val != null) {
          /*if(val.type == 'Athlete'){
            this.getAllCoaches();
          }
          if(val.type == 'Trainer'){
            this.getAllAthletes();
          }*/
          this.renderForm = true;
          this.PersonalForm = new FormGroup({
            user: new FormControl(
              "",
              Validators.compose([Validators.required])          
            ),
            name: new FormControl(
              val.user_display_name,
             Validators.compose([Validators.required])
            ),
            email: new FormControl(
              val.user_email,
              Validators.compose([Validators.required])
            ),
            message: new FormControl(
              "",
              Validators.compose([Validators.required])
            ),
          }); 
        }
        else{
          this.router.navigate(['/login']);
        }
      });   
  }

  ngOnInit() {
    
   }

  async showLoader(msg='Please wait...') {
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
    console.log(this.PersonalForm.value);

    if(this.PersonalForm.valid){
      
      this.showLoader();

      let userData = this.PersonalForm.value;

      this.storage.get("user").then((val) => {
        if (val && val != null){
          this.webService.contact_to_admin(val.token , userData).subscribe(
            (result) => {
                
               this.hideLoader();
               
               this.storage.get('user').then((val) => {
                  if (val != null) {
                    this.resData = result;

                    if(this.resData.sendEmail == 'failed'){
                      this.presentAlert('Email sent failed');
                    }
                    else{
                      this.presentAlert('Email sent successfully');
                    }


                    this.renderForm = true;
                    this.PersonalForm = new FormGroup({
                      user: new FormControl(
                        "",
                        Validators.compose([Validators.required])          
                      ),
                      name: new FormControl(
                        val.user_display_name,
                       Validators.compose([Validators.required])
                      ),
                      email: new FormControl(
                        val.user_email,
                        Validators.compose([Validators.required])
                      ),
                      message: new FormControl(
                        "",
                        Validators.compose([Validators.required])
                      ),
                    }); 
                  }
                  else{
                  
                  }
                });   

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
  }

  getAllCoaches(){
    this.showLoader();
    this.Coaches = [];
    this.webService.getAllCoaches().subscribe((result) => {
      
        this.resData = result;
        this.Coaches = this.resData.Coaches;
        this.hideLoader();
      }, (err) => {
        this.hideLoader();
        let ErrorData =  err.error;
        this.presentAlert((ErrorData.errorMsg ? ErrorData.errorMsg : 'Server Error') );
       
    }); 
    
  }


  getAllAthletes(){
    this.showLoader();
    this.Coaches = [];
    this.webService.getAllAthletes().subscribe((result) => {
      
        this.resData = result;
        this.Coaches = this.resData.Coaches;
        this.hideLoader();
      }, (err) => {
        this.hideLoader();
        let ErrorData =  err.error;
        this.presentAlert((ErrorData.errorMsg ? ErrorData.errorMsg : 'Server Error') );
       
    }); 
    
  }

}