import { Component, OnInit,ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router , NavigationExtras } from '@angular/router';
import { Storage } from "@ionic/storage";
import { QueryList, ViewChildren } from '@angular/core';

import { ServiceForAllService } from '../service-for-all.service';
import { ActionSheetController,LoadingController,AlertController,NavController , Platform } from '@ionic/angular';

@Component({
  selector: 'app-wishlist',
  templateUrl: 'wishlist.page.html',
  styleUrls: ['wishlist.page.scss'],
})
export class WishlistPage implements OnInit{
  

  Wishlists = [];
  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public serviceForAllService: ServiceForAllService,
  ) {

     this.storage.get("user").then((val) => {
        if (val && val != null){
           
        }
        else{
        this.router.navigate(['/login']);
        }     
      });

       this.storage.get("wishlists").then((val) => {
          if (val && val != null){
            this.Wishlists = val;
          }
      });

    }

  ngOnInit(){
    
  }

  ionViewWillEnter(){
    
  }
  
  
  back(){
    this.location.back();
    console.log('backkk')
  }
  
}
