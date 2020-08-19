import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router,ActivatedRoute ,NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";
import { QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-nutritionRecoveryJournal',
  templateUrl: 'nutritionRecoveryJournal.page.html',
  styleUrls: ['nutritionRecoveryJournal.page.scss'],
})
export class NutritionRecoveryJournalPage implements OnInit{
  deferredPrompt: any;
  showInstallBtn: boolean = true;
  pwa_features: any;

  slideOpts = {
    initialSlide: .5,
    speed: 400
  };

 

today = new Date()
yesterday = new Date(this.today)
tomorrow = new Date(this.today)

nutritions = [];  

  constructor(
    private http: HttpClient,
    private router: Router,
    public storage: Storage,
    public location: Location,
  ) {

  this.yesterday.setDate(this.yesterday.getDate() - 1)
  this.tomorrow.setDate(this.today.getDate() + 1)

    this.nutritions = [
    { date: this.today , sleep : 20 , calories : 1050 },
    { date: this.yesterday , sleep : 5 , calories : 680 },
    { date: this.tomorrow , sleep : 18 , calories : 450 },
  ];  

    }

  ngOnInit(){
    
  }
  search(){
    console.log('search');
  }


goTo(){
  console.log('next');

  
}

  back(){
    this.location.back();
    console.log('backkk')
  }


}
