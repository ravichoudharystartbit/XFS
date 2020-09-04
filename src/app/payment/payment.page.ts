import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute ,NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";
import { QueryList, ViewChildren } from '@angular/core';

declare var Stripe;

@Component({
  selector: 'app-payment',
  templateUrl: 'payment.page.html',
  styleUrls: ['payment.page.scss'],
})
export class PaymentPage implements OnInit{

  stripe = Stripe('pk_test_c2z9zQhHw3cCdnRBP8vJDxkx');
  card: any;

  deferredPrompt: any;
  showInstallBtn: boolean = true;
  pwa_features: any;
  cardnumber = '';
  expiry = '';
  cvv = '';
  name = '';
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
slideOptsTwo = {
    initialSlide: 1,
    slidesPerView: 1.15,
    loop: true,
    centeredSlides: true,
    spaceBetween: 8
  };

today = new Date()
yesterday = new Date(this.today)




menuItems = [
    { val: 'Edit' },
    { val: 'Delete' },    
  ];  

  constructor(
    private http: HttpClient,
    private router: Router,
    public storage: Storage,
    public route: ActivatedRoute,
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
    this.setupStripe();
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

 ionViewDidLoad() {
    this.setupStripe();
  }

  setupStripe(){
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });

    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();

      // this.stripe.createToken(this.card)
      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
        }
      });
    });
  }


  makePayment(token) {
  console.log('token')
     this.http
      .post(
        'https://us-central1-shoppr-c97a7.cloudfunctions.net/payWithStripe', {
       amount: 100,
       currency: "usd",
       token: token.id
     })
     .subscribe(data => {
     console.log(data);
     });
}



}
