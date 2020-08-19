import { Component, OnInit , ViewChild } from "@angular/core";
import {
  AlertController,
  LoadingController,
  NavController,
  MenuController
} from "@ionic/angular";
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
import { Location } from '@angular/common';
  
@Component({
  selector: "app-coach",
  templateUrl: "./coach.page.html",
  styleUrls: ["./coach.page.scss"]
})
export class CoachPage implements OnInit {
  
  isLoading = false;
  showInput = false;
  isShow = true; 

  response: any;
  Clients = [
     {name: 'Coach 1' , star:5.0, address: 'ABC US' , image : 'assets/xfs_image/34/p_1.png'},
    {name: 'Coach 2' , star:4.5, address: 'RFG US' , image : 'assets/xfs_image/34/p_2.png'},
    {name: 'Coach 3' , star:2.2, address: 'SED US' , image : 'assets/xfs_image/34/p_3.png'},
    {name: 'Coach 4' , star:3.5, address: 'SDFD US' , image : 'assets/xfs_image/34/p_4.png'}
  ]
  
  constructor(
    public storage: Storage,
    public navCtrl:NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navController: NavController,
    public events: Events,
    private router: Router,
    public menu: MenuController,
    private route : ActivatedRoute,
    private location : Location ,
  ) {  
    
     
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

  back(){
    this.location.back();
    console.log('backkk')
  }
 
}