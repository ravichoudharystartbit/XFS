import { Component, OnInit,ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router , NavigationExtras } from '@angular/router';
import { Storage } from "@ionic/storage";
import { QueryList, ViewChildren } from '@angular/core';

import { ServiceForAllService } from '../service-for-all.service';
import { ActionSheetController,LoadingController,AlertController,NavController ,ToastController , Platform } from '@ionic/angular';

@Component({
  selector: 'app-store',
  templateUrl: 'store.page.html',
  styleUrls: ['store.page.scss'],
})
export class StorePage implements OnInit{
  loading : any;
  resData : any;
  Products  = [];
  Categories  = [];
  filterCatData  = [];

  SelectedCategory: any;
  SearchCategory: any;
  SortValue: any;

  slideOpts = {
    initialSlide: .5,
    speed: 400
  };

slideOpts123 = {   
    slidesPerView : '3', 
    zoom: {
      toggle: false
    }
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

searchInput = '';

str = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";


menuItems = [
    { val: 'Edit' },
    { val: 'Delete' },    
  ];  

  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public serviceForAllService: ServiceForAllService,
    public toastController: ToastController
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
        this.getAllProducts();
     
  }
  getAllProducts(){
    this.showLoader();
    this.serviceForAllService.getAllProducts().subscribe((result) => {
      
        this.resData = result;
        this.Products = this.resData.Products;
        this.Categories = this.resData.Categories.filter(x=>(x.name != 'Uncategorized'));

        this.filterCatData = this.Products.filter(x=> (x.catgories.filter(y => y.slug == this.Categories[0]['slug'])).length > 0 );

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



toggleShowSort(){
  console.log(this.showSort , 'toggleShowSort')
  this.showSort = !this.showSort;
}


hideShowSort(){
 // console.log(this.showSort , 'hideShowSort')
 // this.showSort = false;
}

goTo(){
 // console.log(this.showSort , 'hideShowSort')
 // this.showSort = false;
}

detail(){
  let navigationExtras: NavigationExtras = {
    queryParams: {
      'ID' : '1',  
    } 
  };
  this.router.navigate(['/product_details'] , navigationExtras);
}

openSlideContent( contentId , tabId) {
    this.filterCatData = [];
    var i, tabcontent, tablinks;
   

    tablinks = document.getElementsByClassName("slideContent");
   
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }


  // document.getElementById(contentId).style.display = "block";

    var element = document.getElementById('tab'+tabId);
    element.classList.add("active");

     this.filterCatData = this.Products.filter(x=> (x.catgories.filter(y => y.slug == contentId)).length > 0 );
     this.SelectedCategory = contentId;
     console.log(this.filterCatData)
}

  back(){
    this.location.back();
    console.log('backkk')
  }

  search(){
    console.log('search..................')
    if(this.searchInput){
      console.log(this.searchInput);
      this.searchInput = this.searchInput.toLowerCase();

      let arr = this.filterCatData.filter(
        (x)=>{
          if((x.name.toLowerCase().indexOf(this.searchInput)) >= 0){
            return x;
          }
        }
        );
      this.filterCatData = arr;
    } 
    else{
      this.filterCatData = this.Products.filter(x=> (x.catgories.filter(y => y.slug == this.SelectedCategory )).length > 0 );
    }  
    this.searchInput = '';
  }

  sort(value){
    if(value == 'new'){
      this.filterCatData.sort(function(a, b) {
        var keyA = new Date(a.date),
          keyB = new Date(b.date);
        // Compare the 2 dates
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
      });

      console.log(this.filterCatData)
    }
    else if(value == 'alpha'){
      var key = 'name';
      this.filterCatData.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }
    else{

      
    }
    console.log(value)

    
  }

  addToWishlist(product){ 
    //console.log('add to wishlist') 
    this.storage.get("wishlists").then((val) => {
      if (val && val != null){
         let previousWish = val;
         var index = previousWish.findIndex(x=>x.ID == product.ID);
         console.log(index)
         if(index == -1){
          previousWish.push(product);
          this.storage.set("wishlists", previousWish);
          let message = 'Product successfully added to wishlist.'
          this.presentToastWithOptions(message , true);
         }
         else{
          let message = 'Product already added to wishlist.';
          this.presentToastWithOptions(message , false);
         }
         

      }
      else{
        let wish = [];
        wish.push(product);
        this.storage.set("wishlists", wish);
        let message = 'Product successfully added to wishlist.'
        this.presentToastWithOptions(message , true);
      }
    });
  }

  async presentToastWithOptions(message , condition) {
    const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        position: 'top',
        color: condition ? 'success' : 'danger',
      });
      toast.present();
    }
}
