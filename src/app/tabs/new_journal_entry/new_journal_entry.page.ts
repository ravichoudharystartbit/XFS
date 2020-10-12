import { Component, OnInit,ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router , NavigationExtras } from '@angular/router';
import { Storage } from "@ionic/storage";
import { QueryList, ViewChildren } from '@angular/core';

import { ServiceForAllService } from '../../service-for-all.service';
import { ActionSheetController,LoadingController,AlertController,NavController , Platform } from '@ionic/angular';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  ReactiveFormsModule
} from "@angular/forms";


@Component({
  selector: 'app-new_journal_entry',
  templateUrl: 'new_journal_entry.page.html',
  styleUrls: ['new_journal_entry.page.scss'],
})
export class NewJournalEntryPage implements OnInit{
  
  NewJournalForm: FormGroup;
  isLoading = false;
  resData: any ;
  Entries = [];
  validation_messages = {
    hours_of_sleep: [
      { type: "required", message: "This Field is required." },
    ],
    naps: [
      { type: "required", message: "This Field is required." },
    ],
    calories: [
      { type: "required", message: "This Field is required." },
    ],
    carbs: [
      { type: "required", message: "This Field is required." },
    ],
    protiens: [
      { type: "required", message: "This Field is required." },
    ],
    fat: [
      { type: "required", message: "This Field is required." },
    ],
    injury_status: [
      { type: "required", message: "This Field is required." },
    ],
    are_you_sick_today: [
      { type: "required", message: "This Field is required." },
    ],
    rating: [
      { type: "required", message: "This Field is required." },
    ],
  };
  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public serviceForAllService: ServiceForAllService,
  ) {

     this.storage.get("user").then((val) => {
        if (val && val != null){
           
        }
        else{
        this.router.navigate(['/login']);
        }     
      });

      this.NewJournalForm = new FormGroup({
        hours_of_sleep: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        naps: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        calories: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        carbs: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        protiens: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        fat: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        injury_status: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        are_you_sick_today: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        rating: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
      
      });
    }

  ngOnInit(){
   
  }

  ionViewWillEnter(){
    //this.getEntries();
     this.NewJournalForm = new FormGroup({
        hours_of_sleep: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        naps: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        calories: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        carbs: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        protiens: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        fat: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        injury_status: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        are_you_sick_today: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        rating: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
      
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

  back(){
    this.location.back();
    console.log('backkk')
  }

  submit(){
    console.log('submit');
    console.log(this.NewJournalForm.value);
    if(this.NewJournalForm.valid){
      this.showLoader();

      let newEntryData = this.NewJournalForm.value;

      this.storage.get("user").then((val) => {
        if (val && val != null){
          this.serviceForAllService.create_new_journal_entry(val.token , newEntryData).subscribe(
            (result) => {
                this.NewJournalForm = new FormGroup({
                  hours_of_sleep: new FormControl(
                    null,
                    Validators.compose([
                      Validators.required,
                    ])
                  ),
                  naps: new FormControl(
                    null,
                    Validators.compose([
                      Validators.required,
                    ])
                  ),
                  calories: new FormControl(
                    null,
                    Validators.compose([
                      Validators.required,
                    ])
                  ),
                  carbs: new FormControl(
                    null,
                    Validators.compose([
                      Validators.required,
                    ])
                  ),
                  protiens: new FormControl(
                    null,
                    Validators.compose([
                      Validators.required,
                    ])
                  ),
                  fat: new FormControl(
                    null,
                    Validators.compose([
                      Validators.required,
                    ])
                  ),
                  injury_status: new FormControl(
                    null,
                    Validators.compose([
                      Validators.required,
                    ])
                  ),
                  are_you_sick_today: new FormControl(
                    null,
                    Validators.compose([
                      Validators.required,
                    ])
                  ),
                  rating: new FormControl(
                    null,
                    Validators.compose([
                      Validators.required,
                    ])
                  ),
                
                });
               console.log('update successfully');
               this.hideLoader();
               this.presentAlert('Record created successfully');
            },
            err => {
              this.hideLoader();
              this.presentAlert((err.errorMsg ? err.errorMsg : 'Server Error') );
            }
          );
        }
      });

    }
    else{
      this.presentAlert( "All Fields are required" );
    }
  }

  getEntries(){
    this.showLoader();
    this.storage.get("user").then((val) => {
      if (val && val != null){
        this.serviceForAllService.get_journal_entry(val.token).subscribe(
          (result) => {
             this.hideLoader();
             this.resData = result;
             this.Entries = this.resData.Entries;
             console.log(this.resData.Entries);
          },
          err => {
            this.hideLoader();
            this.presentAlert((err.errorMsg ? err.errorMsg : 'Server Error') );
          }
        );
      }
    });
  }
  
}
