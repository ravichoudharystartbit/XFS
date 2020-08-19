import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router , NavigationExtras } from '@angular/router';
import { Storage } from "@ionic/storage";
import { QueryList, ViewChildren } from '@angular/core';
import { ActionSheetController,LoadingController,AlertController,NavController , Platform } from '@ionic/angular';

import { ServiceForAllService } from '../../service-for-all.service';
@Component({
  selector: 'app-news',
  templateUrl: 'news.page.html',
  styleUrls: ['news.page.scss'],
})
export class NewsPage implements OnInit{

  loading : any;
  resData : any;
  News  = [];

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
    private loadingCtrl: LoadingController,
    public storage: Storage,
    public serviceForAllService: ServiceForAllService,
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
  ionViewWillEnter(){    
    this.getAllNews();     
  }
  getAllNews(){
    this.showLoader();
    this.News = [];
    this.serviceForAllService.getAllNews().subscribe((result) => {
      
        this.resData = result;
        this.News = this.resData.News;

        console.log(this.News);
        this.dismissLoading();
      }, (err) => {
        this.dismissLoading();
        let ErrorData =  err.error;
         // this.presentAlert((ErrorData.errorMsg ? ErrorData.errorMsg : 'Server Error') );
       
    }); 
    
  }

  async showLoader(){
    this.loading = await this.loadingCtrl.create({message: 'Please wait...'});
    this.loading.present();

  }
  async dismissLoading() {
    if(this.loading){
      await this.loading.dismiss();
    } 
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

goTo(id){
  

  let news = this.News[this.News.findIndex(x=> x.ID == id)];
  console.log(news);
  let navigationExtras: NavigationExtras = {
    queryParams: {
      'ID' : '1',  
      'SingleNews' :  JSON.stringify(news),  
    } 
  };
  this.router.navigate(['/tabs/single_news'] , navigationExtras);
}


}
