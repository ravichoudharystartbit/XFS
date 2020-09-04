import { Component, OnInit, NgZone } from "@angular/core";
//import { ConfigService } from "src/app/services/config/config.service";
import { FormGroup } from "@angular/forms";
//import { CommonService } from "src/app/services/common/common.service";
import { Router, ActivatedRoute } from "@angular/router";
//import { UserService } from "src/app/services/user/user.service";
import { AppComponent } from "../app.component";
import { Storage } from "@ionic/storage";
import { ServiceForAllService } from '../service-for-all.service';


declare var Stripe: any;
@Component({
  selector: "app-paymentTest",
  templateUrl: "./paymentTest.page.html",
  styleUrls: ["./paymentTest.page.scss"],
})
export class PaymentTestPage implements OnInit {
  public ssn: any;
  public stripe = Stripe("pk_test_GXxlv9jXwgB3DgXyLhUKNOl300BGPSujo8");
  public card: any;
  public today: any;
  public year: any;
  public month: any;
  public action: any;
  public day: any;
  public user_id: any;
  public price: any;
  public role: any;
  public payForm: FormGroup;
  public regnm = new RegExp("^[a-zA-Z ]*$");
  public reg = new RegExp("^[0-9]*$");
  public regem = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  //public varify_amount: any = "XX.x";
  public varify_amount: any = "10.00";
  varify_amounthh: any = "10.00";

  constructor(
   // public config: ConfigService,
   // public common: CommonService,
    public zone: NgZone,
    public router: Router,
   // public user: UserService,
    public route: ActivatedRoute,
    public app: AppComponent,
    public storage: Storage,
    public serviceAll: ServiceForAllService
  ) {
  console.log('payment');
    this.zone.run(() => {
      this.route.queryParams.subscribe((params) => {
        if (params) {
          this.action = params.action;
        }
      });
    });
  }
  ngOnInit() {
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
        color: "#333",
        fontWeight: 600,
        fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":focus": {
          color: "#333",
        },

        "::placeholder": {
          color: "#CFD7DF",
        },

        ":focus::placeholder": {
          color: "#CFD7DF",
        },
      },
      invalid: {
        color: "#333",
        ":focus": {
          color: "#333",
        },
        "::placeholder": {
          color: "#333",
        },
      },
      empty: {
        color: "#CFD7DF",
        ":focus": {
          color: "#CFD7D",
        },
        "::placeholder": {
          color: "#CFD7D",
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
    });
    cardCvc.mount("#example3-card-cvc");

    var holderName = elements.create("holderName", {
      style: elementStyles,
      classes: elementClasses,
    });
    cardCvc.mount("#example3-holder-name");

    this.registerElements([cardNumber, cardExpiry, holderName], "example3");
  }

  ionViewWillEnter() {
    this.zone.run(() => {
      this.storage.get("user").then(
        (userData) => {
          if (userData != null || userData != undefined) {
            this.user_id = userData.user_id;
            this.varify_amount = userData.verification_value;
          } else {
            this.user_id = this.app.global_obj["user_id"];
            this.varify_amount = this.app.global_obj["verification_value"];
          }
        },
        (err) => {
          this.user_id = this.app.global_obj["user_id"];
          this.varify_amount = this.app.global_obj["verification_value"];
        }
      );
    });
  }

  goBack() {
    this.router.navigate(["tabs/tabs/tab1"]);
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
          "input[type='text'], input[type='email'], input[type='tel']"
        ),
        (input) => {
          input.removeAttribute("disabled", "true");
        }
      );
    }

    function disableInputs() {
      Array.prototype.forEach.call(
        form.querySelectorAll(
          "input[type='text'], input[type='email'], input[type='tel']"
        ),
        (input) => {
          input.setAttribute("disabled", "true");
        }
      );
    }

    function triggerBrowserValidation() {
      if (this.ssn != undefined || this.ssn != "") {
       // this.common.presentAlert(this.config.ssn_err);
      }
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
        if (event.error) {
          error.classList.add("visible");
          savedErrors[idx] = event.error.message;
        //  return this.common.presentAlert(savedErrors[idx]);
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
        }
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      var plainInputsValid = true;
      Array.prototype.forEach.call(form.querySelectorAll("input"), (input) => {
        if (input.checkValidity && !input.checkValidity()) {
          plainInputsValid = false;
          return;
        }
      });

      if (!plainInputsValid) {
        triggerBrowserValidation();
        return;
      }

      example.classList.add("submitting");
      disableInputs();
      console.log(elements[0]);
      this.stripe.createToken(elements[0]).then((result) => {
        example.classList.remove("submitting");
        if (result.token) {
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
    if (this.ssn == undefined || this.ssn == "") {
     // this.common.presentAlert(this.config.ssn_err);
    } else {
      if (!navigator.onLine) {
       // this.common.presentAlert(this.config.no_internet);
      } else {
        setTimeout(() => {
          if (!navigator.onLine) {
           // this.common.presentAlert(this.config.no_internet);
          }
        }, 2000);
        const body = {
          user_id: this.user_id,
          card_type: token.card.brand,
          stripe_token: token.id,
          ssn: this.ssn,
        };
        //this.common.showLoader();
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append("user_lang", "en");
        urlSearchParams.append("role", "USER");
        urlSearchParams.append("platform", "browser");
        urlSearchParams.toString();
        this.serviceAll.varifyStripe(body, urlSearchParams).subscribe(
          (resp: any) => {
           // this.common.dismiss();
            if (resp.code == 0) {
              if (
                this.app.global_obj != undefined ||
                this.app.global_obj != null
              ) {
                this.app.global_obj = Object.assign(this.app.global_obj, resp);
              } else {
                this.app.global_obj = resp;
              }
              this.storage.set("user", this.app.global_obj);
              if (this.action == "menu") {
                /*this.common.presentAlertConfirminvalid(
                  this.config.added_success,
                  "/tabs/tabs/tab1"
                );*/
              } else {
               /* this.common.presentAlertConfirminvalid(
                  this.config.added_success,
                  "thankyou"
                ); */
              }
            } else {
             // return this.common.presentAlert(resp.message);
              return true;
            }
          },
          (err) => {
           // this.common.dismiss();
           // return this.common.presentAlert(err);
          }
        );
      }
    }
  }

  openThankyou() {
    this.router.navigate(["thankyou"]);
  }
}
