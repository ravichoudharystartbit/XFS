import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute ,NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";
import { QueryList, ViewChildren } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  MenuController
} from "@ionic/angular";
import { ServiceForAllService } from '../service-for-all.service';
import { AppComponent } from "../app.component";

declare var Stripe;

@Component({
  selector: 'app-payment',
  templateUrl: 'payment.page.html',
  styleUrls: ['payment.page.scss'],
})
export class PaymentPage implements OnInit{
  isLoading = false;
  stripe = Stripe('pk_test_c2z9zQhHw3cCdnRBP8vJDxkx');
  card: any;
  selectcard: any;
  public user_id: any;
  deferredPrompt: any;
  showCreateNewCard: boolean = false;
  pwa_features: any;
  cardnumber = '';
  expiry = '';
  cvv = '';
  name = '';
  slideOpts = {
    initialSlide: .5,
    speed: 400
  };

  cards : any = [];

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
    public alertCtrl: AlertController,
    public serviceAll: ServiceForAllService,
    public app: AppComponent,
     public loadingCtrl: LoadingController,
     public navCtrl: NavController,
  ) {

  this.yesterday.setDate(this.yesterday.getDate() - 1)

     this.storage.get("user").then((val) => {
          if (val && val != null){
             this.user_id = val.user_id;
             this.getStripeCards(val.token)
          }
          else{
          this.router.navigate(['/login']);
          }
       
      });

    }

  ngOnInit(){
    
  }

   registerElements(elements, exampleName) {
    var formClass = "." + exampleName;
    var example = document.querySelector(formClass);

    var form = example.querySelector("form");
    var resetButton = example.querySelector("a.reset");
    var error = form.querySelector(".error");
    var errorMessage = error.querySelector(".message");

    function enableInputs() {
      Array.prototype.forEach.call(
        form.querySelectorAll(
          "input[type='text'], input[type='email'], input[type='password']"
        ),
        (input) => {
          input.removeAttribute("disabled", "true");
        }
      );
    }

    function disableInputs() {
      Array.prototype.forEach.call(
        form.querySelectorAll(
          "input[type='text'], input[type='email'], input[type='password']"
        ),
        (input) => {
          input.setAttribute("disabled", "true");
        }
      );
    }

    function triggerBrowserValidation() {
     /* if (this.ssn != undefined || this.ssn != "") {
        this.presentAlert('ssn_err');
      }*/
      var submit = document.createElement("input");
      submit.type = "submit";
      submit.style.display = "none";
      form.appendChild(submit);
      submit.click();
      submit.remove();
    }

    var savedErrors = {};
    elements.forEach((element, idx) => {
      element.on("change", (event) => {
        console.log('sdsd')
        if (event.error) {
          document.getElementById('card-errors').innerHTML = event.error.message;
          error.classList.add("visible");
          savedErrors[idx] = event.error.message;
          //return this.presentAlert(savedErrors[idx]);
          return false;
        } else {
          savedErrors[idx] = null;
          var nextError = Object.keys(savedErrors)
            .sort()
            .reduce((maybeFoundError, key) => {
              return maybeFoundError || savedErrors[key];
            }, null);

          if (nextError) {
          } else {
            error.classList.remove("visible");
          }
          document.getElementById('card-errors').innerHTML = '';
        }
      });
    });

    form.addEventListener("change", (e) => {
      console.log('form change')
      
    });

    form.addEventListener("submit", (e) => {
      console.log('form submit')
      e.preventDefault();
      var plainInputsValid = true;
      Array.prototype.forEach.call(form.querySelectorAll("input"), (input) => {
      console.log('sdas')
        if (input.checkValidity && !input.checkValidity()) {
          plainInputsValid = false;
          return;
        }
      });
      console.log(plainInputsValid)

      if (!plainInputsValid) {
        triggerBrowserValidation();
        return;
      }

      

      example.classList.add("submitting");
      //disableInputs();
      console.log(elements[0]);
      this.stripe.createToken(elements[0]).then((result) => {
        example.classList.remove("submitting");
        console.log("Stripe" , result);

        if(result.error){
            document.getElementById('card-errors').innerHTML = result.error.message;
        }
        
        if (result.token) {
            if(!this.name){
              document.getElementById('card-errors').innerHTML = 'Please enter card holder name';
              return false;
            }
            else{
              document.getElementById('card-errors').innerHTML = '';

            } 
          document.getElementById('card-errors').innerHTML = '';
          this.stripeTokenHandler(result.token);
          example.classList.add("submitted");
        } else {
          enableInputs();
        }
      });
    });

    if (resetButton) {
      resetButton.addEventListener("click", (e) => {
        e.preventDefault();
        form.reset();
        elements.forEach((element) => {
          element.clear();
        });
        error.classList.remove("visible");
        enableInputs();
        example.classList.remove("submitted");
      });
    }
  }

  stripeTokenHandler(token) {
  /*  if (this.ssn == undefined || this.ssn == "") {
     this.presentAlert('ssn_err');
    } else {*/
      if (!navigator.onLine) {
       this.presentAlert('no_internet');
      } else {
        setTimeout(() => {
          if (!navigator.onLine) {
           this.presentAlert('no_internet');
          }
        }, 2000);
        const body = {
          user_id: this.user_id,
          card_type: token.card.brand,
          stripe_token: token.id,
          ssn: 'demo1234',
          IsNew: true
        };
        this.showLoader();
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append("user_lang", "en");
        urlSearchParams.append("role", "USER");
        urlSearchParams.append("platform", "browser");
        urlSearchParams.toString();
        this.serviceAll.varifyStripeAddCard(body, urlSearchParams).subscribe(
          (resp: any) => {
           this.hideLoader();
            if (resp.code == 0) {
             /* if (
                this.app.global_obj != undefined ||
                this.app.global_obj != null
              ) {
                this.app.global_obj = Object.assign(this.app.global_obj, resp);
              } else {
                this.app.global_obj = resp;
              }
              this.storage.set("user", this.app.global_obj); */
  
              this.presentAlert(resp.message , true);
            } else {
              return this.presentAlert(resp.message);
              return true;
            }
          },
          (err) => {
           this.hideLoader();
           console.log(err)
            return this.presentAlert(err.message);
          }
        );
      }
   /* } */
  }



  search(){
    console.log('search');
  }


  async presentAlert(msg , redirect = false) {
    if(redirect){
      let alert = await this.alertCtrl.create({
        header: "Payment Alert",
        message: msg,
        buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.navigateBack('/tabs/home');
            }
          }]
      });
      await alert.present();
    }
    else{
      let alert = await this.alertCtrl.create({
        header: "Payment Alert",
        message: msg,
        buttons: [{
            text: 'OK',
            handler: () => {
              
            }
          }]
      });
      await alert.present();
    }
    
  }

async showLoader() {
    this.isLoading = true;
    return await this.loadingCtrl
      .create({
        message: "Please wait...",
        cssClass: "custom-load"
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => {
                console.log('dismiss');
            });
          }
        });
      });
  }

  async hideLoader() {
    this.isLoading = false;
    return await this.loadingCtrl
      .dismiss()
      .then(() => {
      console.log('dismiss');
      });
  }

  getStripeCards(token){
    this.showLoader();
    this.serviceAll.getStripeCards(token).subscribe(
      (resp: any) => {
        console.log(resp);

        if(resp.cards.data.length > 0){
          console.log(resp.cards.data.length);
          this.cards = resp.cards.data;
          //this.Customer = resp.Customer;
          this.showCreateNewCard = false;
        }
        else{
          this.showCreateNewCard = true;
        }
        this.hideLoader();
      },
      (err) => {
       this.hideLoader();
       console.log(err);
       this.addNew();
        //return this.presentAlert('Server Error');
      }
    );
  }
  addNew(){
    this.showCreateNewCard = true;
    setTimeout(()=>{
      this.stripeSetup();
    },500)
  }

  stripeSetup(){
    var elements = this.stripe.elements({
      fonts: [
        {
          cssSrc: "https://fonts.googleapis.com/css?family=Quicksand",
        },
      ],
      locale: "auto",
    });

    var elementStyles = {
      base: {
        color: "#fff",
        fontWeight: 600,
        fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":focus": {
          color: "#fff",
        },

        "::placeholder": {
          color: "#fff",
        },

        ":focus::placeholder": {
          color: "#ececec",
        },
      },
      invalid: {
        color: "#fff",
        ":focus": {
          color: "#fff",
        },
        "::placeholder": {
          color: "#ececec",
        },
      },
      empty: {
        color: "#fff",
        ":focus": {
          color: "#fff",
        },
        "::placeholder": {
          color: "#ececec",
        },
      },
    };

    var elementClasses = {
      focus: "focus",
      empty: "empty",
      invalid: "invalid",
    };

    var cardNumber = elements.create("cardNumber", {
      style: elementStyles,
      classes: elementClasses,
      placeholder : '0000 0000 0000 0000'
    });
    cardNumber.mount("#example3-card-number");

    var cardExpiry = elements.create("cardExpiry", {
      style: elementStyles,
      classes: elementClasses,
    });
    cardExpiry.mount("#example3-card-expiry");

    var cardCvc = elements.create("cardCvc", {
      style: elementStyles,
      classes: elementClasses,
      val : 'password',
      placeholder: '***'
    });
    cardCvc.mount("#example3-card-cvc");


    this.registerElements([cardNumber, cardExpiry], "example3");
  }

  CardradioChecked(card) {
    this.selectcard = card;    
  }

  payNow(){
    if(this.selectcard){
    console.log(this.selectcard);
      this.storage.get("user").then((val) => {
        if (val && val != null){
        console.log(val)
          this.showLoader();
          this.serviceAll.payNow(val.token , this.selectcard , val.user_id).subscribe(
            (resp: any) => {
              console.log(resp);
              this.presentAlert(resp.message , true);
              this.hideLoader();
            },
            (err) => {
             this.hideLoader();
             console.log(err)
              return this.presentAlert('Server Error');
            }
          );
        }
           
      });
    }
    else{
      this.presentAlert('Please select card');
    }
    

    }
}
