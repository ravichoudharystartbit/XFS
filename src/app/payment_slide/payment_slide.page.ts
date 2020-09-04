import { Component, OnInit , ViewChild } from "@angular/core";
import {  AlertController, LoadingController,  NavController,  MenuController} from "@ionic/angular";
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import { IonSlides} from '@ionic/angular';
  
@Component({
  selector: "app-payment_slide",
  templateUrl: "./payment_slide.page.html",
  styleUrls: ["./payment_slide.page.scss"]
})
export class PaymentSlidePage implements OnInit {
  
  slideOpts = {
    initialSlide: 0.5,
    speed: 400,
    slidesPerView : 'auto', 
    zoom: {
    toggle: false
  }
  };

@ViewChild('mySlider')  slides: IonSlides;

  constructor(
    private navCtrl : NavController,
    public router : Router,
  ) {
    
    
  }

  ngOnInit() {
    
   } 

  swipeNext(){
    this.slides.slideNext();
  }
  buy(){
    this.router.navigate(['/payment']);
  }
}