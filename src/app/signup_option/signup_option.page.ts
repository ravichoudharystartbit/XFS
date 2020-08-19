import { Component, OnInit , ViewChild } from "@angular/core";
import {
  AlertController,
  LoadingController,
  NavController,
  MenuController
} from "@ionic/angular";
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
  
@Component({
  selector: "app-signup_option",
  templateUrl: "./signup_option.page.html",
  styleUrls: ["./signup_option.page.scss"]
})
export class SignupOptionPage implements OnInit {
  

  
  constructor(
    private navCtrl : NavController,
    public router : Router,
  ) {
    
    
  }

  ngOnInit() {
    
   }

  
   registerFor(type){

      let navigationExtras: NavigationExtras = {
        queryParams: {
          'type' : type 
        } 
      };
      this.router.navigate(['/signup_option_step2'], navigationExtras);
   }


  


}