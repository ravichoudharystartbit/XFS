import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";
import { QueryList, ViewChildren } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  MenuController
} from "@ionic/angular";
import { Location } from '@angular/common';

import { ServiceForAllService } from '../service-for-all.service';

import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-watch_video',
  templateUrl: 'watch_video.page.html',
  styleUrls: ['watch_video.page.scss'],
})
export class WatchVideosPage implements OnInit{
  
  isLoading = false;
  showInput = false;
  isShow = true; 
  resultData : any; 
  AllVideos = []; 
  Categories = []; 
  filterCatData = []; 

  SelectedCategory: any;
  SearchCategory: any;
  SortValue: any;


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
  slideOpts123 = {   
    slidesPerView : '3', 
    zoom: {
      toggle: false
    }
};
searchInput = '';


menuItems = [
    { val: 'Edit' },
    { val: 'Delete' },    
  ];  
slides = [
    { val: 'Sport 1' },
    { val: 'Sport 2' },    
    { val: 'Sport 3' },    
    { val: 'Sport 4' },    
    { val: 'Sport 5' },    
    { val: 'Sport 2' },    
    { val: 'Sport 6' },    
    { val: 'Sport 2' },    
    { val: 'Sport 2' },    
    { val: 'Sport 7' },    
    { val: 'Sport 8' },    
    { val: 'Sport 2' },    
    { val: 'Sport 9' },    
    { val: 'Sport 10' },    
  ];  

  constructor(
    private http: HttpClient,
    private router: Router,
    public storage: Storage,    
    public navCtrl:NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public webService: ServiceForAllService,
    public domSanitizer: DomSanitizer,
    private location: Location,
  ) {

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

  ionViewWillEnter(){
   this.getVideo();
  }

  toggleShowSort(){  
    this.showSort = !this.showSort;
  }


hideShowSort(){
 // console.log(this.showSort , 'hideShowSort')
 // this.showSort = false;
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

  getVideo(){
    this.showLoader();  
    this.storage.get("user").then((val) => {
      if (val && val != null){
        this.webService.getVideos().subscribe(
          (result) => {
              
             this.hideLoader();
             this.resultData = result;
             this.AllVideos = this.resultData.Videos;
             this.Categories = this.resultData.Categories;

             this.AllVideos.map(x=>{
              x.VideoId = this.domSanitizer.bypassSecurityTrustResourceUrl( 'https://player.vimeo.com/video/'+x.VideoId);
              return x;
             })

            this.filterCatData = this.AllVideos.filter(x=> (x.terms.filter(y => y.slug == this.Categories[0]['slug'])).length > 0 );
            if(this.Categories.length > 0){
              this.SelectedCategory = this.Categories[0]['slug']; 
            }


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

  openSlideContent( contentId , tabId) {
    var i, tabcontent, tablinks;
   

    tablinks = document.getElementsByClassName("slideContent");
   
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }


  //  document.getElementById(contentId).style.display = "block";

    var element = document.getElementById('tab'+tabId);
    element.classList.add("active");

     this.filterCatData = this.AllVideos.filter(x=> (x.terms.filter(y => y.slug == contentId)).length > 0 );
    this.SelectedCategory = contentId;
     console.log(this.filterCatData)
}

  cleanURL(id){
    console.log(id)
    let str = 'https://player.vimeo.com/video/'+id;
    let retUrl =  this.domSanitizer.bypassSecurityTrustResourceUrl( 'https://player.vimeo.com/video/'+id);
    return retUrl;
  }

  back(){
    this.location.back();
    console.log('backkk')
  }

  search(){
    if(this.searchInput){
      console.log(this.searchInput);
      this.searchInput = this.searchInput.toLowerCase();

      let arr = this.filterCatData.filter(
            (x)=>{
              if((x.Title.toLowerCase().indexOf(this.searchInput)) >= 0){
              return x;
              }
            }
        );

      console.log(arr)
      this.filterCatData = arr;
    } 
    else{
      this.filterCatData = this.AllVideos.filter(x=> (x.terms.filter(y => y.slug == this.SelectedCategory )).length > 0 );
    }  
    this.searchInput = '';
  }

  sort(value){
    console.log(value)

    if(value == 'new'){
      this.filterCatData.sort(function(a, b) {
        var keyA = new Date(a.Date),
          keyB = new Date(b.Date);
        // Compare the 2 dates
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
      });

      console.log(this.filterCatData)
    }
    else if(value == 'alpha'){
      var key = 'Title';
      this.filterCatData.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }
    else{

      
    }
    console.log(value)

    
  }
}
