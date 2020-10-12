import { Component, OnInit } from "@angular/core";
import {
  AlertController,
  LoadingController,
  NavController,
  MenuController
} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Events } from "@ionic/angular";
import { Router } from "@angular/router";
@Component({
selector: 'app-tabs',
templateUrl: 'tabs.page.html',
styleUrls: ['tabs.page.scss']
})
export class TabsPage {
ShowPage = true;
constructor(
  public menuCtrl: MenuController,
  public storage: Storage,
  private alertCtrl : AlertController,
  private navCtrl : NavController,
  private events : Events,
  private router : Router
  ) {
    this.ShowPage = true;
    this.events.subscribe('userLogoutApp', (value) => {
      this.ShowPage = false;
    })
    this.ShowPage = true;
  }

toggleMenu() {
  this.menuCtrl.toggle(); //Add this method to your button click function
}

tabLogs(){
  this.storage.get("user").then((val) => {
    if (val && val != null) {
        this.navCtrl.navigateForward('/home'); 
    } else {
      this.presentAlert('This functionality needs Login,Do you want login now?');
    }
  });
}
async presentAlert(msg){

  let alert = await this.alertCtrl.create({
    header: 'Alert',
    message: msg,
    buttons: [
      { 
        text: 'No',
        handler: () => {
         
        }
      },
      { 
        text: 'Yes',
        handler: () => {
          this.events.publish('userLogoutApp', false);
          setTimeout(()=>{
            this.navCtrl.setDirection('root');
            this.router.navigate(['/login']);
          },500)
          // this.navCtrl.navigateRoot('login');
        }
      }
    ]
  });

  await alert.present(); 
}

goToProfile(){
  this.router.navigate(['/profile']);
}

goToMessageList(){
  this.router.navigate(['/messages']);  
}


}