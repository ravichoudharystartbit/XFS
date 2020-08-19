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
  selector: "app-edit_info",
  templateUrl: "./edit_info.page.html",
  styleUrls: ["./edit_info.page.scss"]
})
export class EditInfoPage implements OnInit {

  isLoading = false;
  showInput = false;
  isShow = true; 
  
  Email = '';
  OTP = '';
  verifyOTP = '';
  response: any;
  User: any;
  ResData: any;
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
    private route : ActivatedRoute,
    private http : HttpClient,
  ) {
    
    if(this.route.snapshot.queryParamMap.get('user')){
      let userData = JSON.parse(this.route.snapshot.queryParamMap.get('user'));
      this.User = userData;
      this.PersonalForm = new FormGroup({
        name: new FormControl(
          userData.name,
          Validators.compose([
            Validators.required,
          ])
        ),
        DOB: new FormControl(
          userData.DOB,
          Validators.compose([
            Validators.required,
          ])
        ),
        phone: new FormControl(
          userData.phone,
          Validators.compose([
            Validators.required,
          ])
        ),
        sports: new FormControl(
          userData.sports,
          Validators.compose([
            Validators.required,
          ])
        ),
        choice: new FormControl(
          userData.choice,
          Validators.compose([
            Validators.required,
          ])
        ),
      });
    }
    else{
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
          this.webService.updateProfile(val.token , userData).subscribe(
            (result) => {
                console.log('update successfully')
               this.hideLoader();
               this.presentAlert('Record updated successfully');
            },
            err => {
              this.hideLoader();
              this.presentAlert((err.errorMsg ? err.errorMsg : 'Server Error') );
            }
          );
        }
      });
    }
  }

  upload(event:any)
    {

      const formData = new FormData();

      let image=event.target.files[0];

      formData.append('files[]', image);
      this.storage.get("user").then((val) => {
        if (val && val != null){
        this.showLoader('Uploading...');
          this.http.post("http://xfs.betaplanets.com/wp-json/mobileapi/v1/mediaUpload?token=" + val.token,formData)
          .subscribe((data:any)=>{
            this.hideLoader();
            this.ResData = data;
            this.User.userImage = this.ResData.FilePath;
            this.presentAlert('Upload Successfully'); 
            this.showInput = false;
          },
          (err)=>{
          console.log(err);
            let ErrData = err.error;
            this.hideLoader();
            this.presentAlert((ErrData.errorMsg ? ErrData.errorMsg : 'Server Error'));
            // this.showInput = false;
          });
        }
      })
    }
  
  


}