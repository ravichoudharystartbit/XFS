import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router , NavigationExtras } from '@angular/router';
import { Storage } from "@ionic/storage";
import { QueryList, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-trading_star',
  templateUrl: 'trading_star.page.html',
  styleUrls: ['trading_star.page.scss'],
})
export class TradingStarPage implements OnInit{
  deferredPrompt: any;
  showInstallBtn: boolean = true;
  pwa_features: any;

  slideOpts = {
    initialSlide: .5,
    speed: 400
  };

  showSort  =  false;
  slideOpts1 = {   
    initialSlide: 0.5, 
    spaceBetween:5,
    slidesPerView : 'auto', 
    zoom: {
      toggle: false
    }
};

today = new Date();
yesterday = new Date(this.today);
str = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";



menuItems = [
    { val: 'Edit' },
    { val: 'Delete' },    
  ];  

  constructor(
    private http: HttpClient,
    private router: Router,
    public storage: Storage,
    public location: Location,
  ) {

  this.yesterday.setDate(this.yesterday.getDate() - 1)

     this.storage.get("user").then((val) => {
          if (val && val != null){
             
          }
          else{
          this.router.navigate(['/login']);
          }
       
      });

    }

  ngOnInit(){
    
  }
  search(){
    console.log('search');
  }


   openContent( contentId , tabId) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabcontent.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(contentId).style.display = "block";

    var element = document.getElementById(tabId);
    element.classList.add("active");
}

toggleShowSort(){
  console.log(this.showSort , 'toggleShowSort')
  this.showSort = !this.showSort;
}


hideShowSort(){
 // console.log(this.showSort , 'hideShowSort')
 // this.showSort = false;
}

goTo(){
  console.log('next');
  
}

  back(){
    this.location.back();
    console.log('backkk')
  }

}

