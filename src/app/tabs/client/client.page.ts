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
import { ServiceForAllService } from '../../service-for-all.service';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
  
@Component({
  selector: "app-client",
  templateUrl: "./client.page.html",
  styleUrls: ["./client.page.scss"]
})
export class ClientPage implements OnInit {

  isLoading = false;
  showInput = false;
  isShow = true; 
  Clients = [];
  resData: any;
  response: any;
  Coaches = [
    {name: 'Client 1' , star:5.0, address: 'ABC US' , image : 'assets/xfs_image/34/p_1.png'},
    {name: 'Client 2' , star:4.5, address: 'RFG US' , image : 'assets/xfs_image/34/p_2.png'},
    {name: 'Client 3' , star:2.2, address: 'SED US' , image : 'assets/xfs_image/34/p_3.png'},
    {name: 'Client 4' , star:3.5, address: 'SDFD US' , image : 'assets/xfs_image/34/p_4.png'}
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
    private http : HttpClient,
    private serviceForAllService : ServiceForAllService,
  ) {  
    
         
  }

  ngOnInit() {
    
   }

  ionViewWillEnter(){
    this.Clients = [];
    this.getAllClients();
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

  getAllClients(){
    this.showLoader();
    this.Clients = [];
    this.serviceForAllService.getAllAthletes().subscribe((result) => {      
        this.resData = result;
        this.Clients = this.resData.Coaches;
        this.hideLoader();
      }, (err) => {
        this.hideLoader();
        let ErrorData =  err.error;
         // this.presentAlert((ErrorData.errorMsg ? ErrorData.errorMsg : 'Server Error') );       
    }); 
    
  }


  
}