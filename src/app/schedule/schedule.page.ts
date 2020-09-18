/*import { Component, OnInit,ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router , NavigationExtras } from '@angular/router';
import { Storage } from "@ionic/storage";
import { QueryList, ViewChildren } from '@angular/core';

import { ServiceForAllService } from '../service-for-all.service';
import { ActionSheetController,LoadingController,AlertController,NavController , Platform } from '@ionic/angular';

@Component({
  selector: 'app-schedule',
  templateUrl: 'schedule.page.html',
  styleUrls: ['schedule.page.scss'],
})
export class SchedulePage implements OnInit{
  

  Wishlists = [];
  loading : any;
  resData : any;
  Coaches  = [];

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
    }

  ngOnInit(){
    this.getAllCoaches();
  }

  ionViewWillEnter(){
    
  }
  
  
  back(){
    this.location.back();
    console.log('backkk')
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

  getAllCoaches(){
    this.showLoader();
    this.Coaches = [];
    this.serviceForAllService.getAllCoaches().subscribe((result) => {
      
        this.resData = result;
        this.Coaches = this.resData.Coaches;

        console.log(this.Coaches);
        this.dismissLoading();
      }, (err) => {
        this.dismissLoading();
        let ErrorData =  err.error;
        this.presentAlert((ErrorData.errorMsg ? ErrorData.errorMsg : 'Server Error') );
       
    }); 
    
  }

  async presentAlert(msg,type:boolean=false){
    if(!type){
      let alert = await this.alertCtrl.create({
        header: 'Alert',
        message: msg,
        buttons: ['OK']
      });
    
      await alert.present();
    }else{
      let alert = await this.alertCtrl.create({
        header: 'Alert',
        message: msg,
        buttons: [
        { 
            text: 'OK',
            handler: () => {
              
            }
          }
        ]
      });
    
      await alert.present(); 
    }
  }

}
*/

import { ViewChild, Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { MenuController, LoadingController,AlertController, NavController } from '@ionic/angular';

import { Storage } from '@ionic/storage';


import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'], 
})
export class SchedulePage implements OnInit {
  mediaFiles = [];
  @ViewChild('myvideo') myVideo: any;
  selectedSlot:any = -1;
  isday:any;
  user_token: any;
  user_id:any = '';

  date: any;
  daysInThisMonth: any= [];
  daysInLastMonth: any= [];
  daysInNextMonth: any = [];
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;

  selectedDate: any;

  daysInLastWeek:any;
  daysInThisWeek:any;
  daysInNextWeek:any;
  weekNames: string[];
  eventList: any;
  selectedEvent: any;
  isSelected: any;

  availability:any = [];

  doctor_id:any = '';
  hospital_id:any = '';

  slots:any = [];
  selectedTime:any = '';
  selectedTimeEnd:any = '';

  audioFile:any = '';
  videoFile:any = '';

  audioFileName:any = '';
  videoFileName:any = '';

  audioFilePath:any = '';
  videoFilePath:any = '';

  loading:any;

  desc:any = '';

  isHoliday:any = '';

  page_title:any = '';
  dataReturned:any;
  constructor(
   // public allServices:AllServicesService,
    public route: ActivatedRoute,
    private router: Router,
    public menu: MenuController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalController: ModalController, 
  ) { 

    this.selectedSlot = -1;
    this.selectedTime = '';
    this.selectedTimeEnd = '';

    this.monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    this.weekNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    this.date = new Date();

    this.route.params.subscribe(data => {
      if (data.page_title && data.page_title!='' ) {
        this.page_title = data.page_title;
      }
      else{
        this.page_title = "Schedule Appt.";
      }
    });

    this.selectedDate = new Date();
    console.log('sd NEW: ', this.selectedDate)
    
    
    //this.date = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0);
    this.getDaysOfMonth();
    // this.getWeekOfDays();

    this.loadEventThisMonth();
    // this.loadEventToday();
  }

  ngOnInit() { 
  }


  ionViewWillLeave() {
    this.menu.enable(true);
  }

  ionViewWillEnter() {
    this.menu.enable(false);

   /* this.allServices.checkingProcess();
    this.allServices.CheckMembership();
    */

    this.route.params.subscribe(data => {
      if (data) {
        this.doctor_id = data.doctor_id;  
        this.hospital_id = data.hospital_id;
      }
    });

    this.storage.get('user').then((val) => {
      if(val!=null){
        this.user_token = val.token;
        this.user_id = val.user_id;
      }
    });

    this.route.params.subscribe(data => {
      if (data.appointment_id && data.appointment_id!='' ) {

        this.audioFilePath = data.audio_path;
        // this.audioFile = this.audioFilePath.fullPath.replace(/\/\//, '');

        this.audioFileName = new String(this.audioFilePath).substring(this.audioFilePath.lastIndexOf('/') + 1); 

        //
        
        this.videoFilePath = data.video_path;
        this.videoFileName = new String(this.videoFilePath).substring(this.videoFilePath.lastIndexOf('/') + 1); 

        this.desc = data.description;
      }
      else{
        this.audioFilePath = '';
        this.audioFileName = '';  
        

        //
        
        this.videoFilePath = '';
        this.videoFileName = '';
      }
    });
    
  }


  getDaysOfMonth() {
    this.selectedSlot = -1; 
    this.selectedTime = '';
    this.selectedTimeEnd = '';

    this.isSelected = false;
    this.isday = 9999;
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();

    // if(this.date.getMonth() === new Date().getMonth()) {
    //   this.currentDate = new Date().getDate();
    // } else {
    //   this.currentDate = 999;
    // }

    if (this.date.getMonth() == new Date().getMonth()) {
        this.currentDate = new Date().getDate();
        let currentCustom = new Date().getDate();
        this.selectDate(currentCustom);
        console.log('if condition');
    } else {
        this.currentDate = 999;
        this.selectDate(999);
        console.log('not condition');
    }
  
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }
  
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i+1);
    }
  
    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var i = 0; i < (6-lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }
  goToLastMonth() {
    this.selectedSlot = -1;
    this.selectedTime = '';
    this.selectedTimeEnd = '';

    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
    this.isday = '';
    this.eventList='';
    this.loadEventThisMonth();
    // this.loadEventToday();
  }
  
  goToNextMonth() {
    this.selectedSlot = -1;
    this.selectedTime = '';
    this.selectedTimeEnd = '';

    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
    this.isday = '';
    this.eventList='';
    this.loadEventThisMonth();
  }

  GetRecentTopic(selectedDate) {
    this.selectedSlot = -1;
    this.selectedTime = '';
    this.selectedTimeEnd = '';

    this.route.params.subscribe(data => {
      if (data) {
        this.doctor_id = data.doctor_id;  
        this.hospital_id = data.hospital_id;

        console.log('doctorData11: ', this.doctor_id);
        console.log('hospitalID11: ', this.hospital_id);

        let todayD = (new Date());

       /* this.allServices.getAllDates(this.hospital_id,this.doctor_id,selectedDate, '', todayD)
        .subscribe(data => {
          let sl:any = [];
          sl = data;
          this.slots = sl.slots;
          this.isHoliday = sl.holiday;
          console.log('sl:' ,this.slots);
        });
        */
      }
    });
}

changeCalenderEvents(){
  this.selectedSlot = -1;
  let monthData= this.monthNames.indexOf(this.currentMonth)+1;
  this.date = new Date(this.currentYear,monthData, 0);
  this.getDaysOfMonth();
  this.isday = '';
}

selectDate(day) { 
  this.selectedSlot = -1;
  this.selectedTime = '';
  this.selectedTimeEnd = '';

  this.isSelected == true;
  this.isday = day;

  this.selectedEvent = new Array();
  this.selectedDate = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day;

  console.log('sd: ', this.selectedDate);
  this.GetRecentTopic(this.selectedDate);
}

loadEventToday() {
  this.selectedSlot = -1;
  this.selectedTime = '';
  this.selectedTimeEnd = '';

  this.currentDate = new Date().getDate();
  this.selectDate(this.currentDate);
}

loadEventThisMonth() {

  this.selectedSlot = -1;
  this.selectedTime = '';
  this.selectedTimeEnd = '';
  
  this.eventList = new Array();
  let startDate = new Date(this.date.getFullYear(), this.date.getMonth(),1);
  let endDate = new Date(this.date.getFullYear(), this.date.getMonth()+1);

  let startDate1 = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate();
  // let endDate1 = endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+(endDate.getDate());

  let total_days = this.daysInThisMonth.length;

  console.log('total_days-----------------: ', total_days);

  let endDate1 = endDate.getFullYear()+"-"+(endDate.getMonth())+"-"+total_days;

  

  this.route.params.subscribe(data => {
    if (data) {
      this.doctor_id = data.doctor_id;  
      this.hospital_id = data.hospital_id;

      console.log('doctorData11: ', this.doctor_id);
      console.log('hospitalID11: ', this.hospital_id);

      let todayD = (new Date());

     /* this.allServices.getAllDates(this.hospital_id,this.doctor_id,startDate1, endDate1, todayD)
        .subscribe(data => {
          let sl:any = [];
          sl = data;

          this.eventList = sl.slots;
          this.eventList = Array.from(new Set(this.eventList.map((item: any) => item.slot_day)))
          console.log('lll: ',this.eventList);
        });
      */
    }
  });

}

  selectTime(st,et,i){
    this.selectedSlot = i;
    this.selectedTime = st;
    this.selectedTimeEnd = et; 
  }





  async presentAlert(msg) {
    let alert = await this.alertCtrl.create({
      backdropDismiss: true,
      header: 'Message',
      message: msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertWithNav(msg) {
    let alert = await this.alertCtrl.create({
      backdropDismiss: true,
      header: 'Message',
      message: msg,
      buttons: [
        {
          text: "Go to forms",
          handler: () => {
            this.router.navigate(['/list']);
          }
        },
        {
          text: 'OK',
          handler: () => {
            
          }
        }
      ]
    });

    await alert.present();
  }
  
  async showLoader(msg){
    this.loading = await this.loadingCtrl.create({message: msg});
    this.loading.present();
  }
  async dismissLoading() {
    console.log(this.loading);
    await this.loading.dismiss();
  }

  delMedia(t){
    if(t=='v'){
      this.videoFile = '';
      this.videoFileName = '';
    }
    else{
      this.audioFile = '';
      this.audioFileName = '';
    }
  }
/*
  schApp(){
    this.route.params.subscribe(data => {
      if (data.appointment_id && data.appointment_id!='' ) {

        this.showLoader('Rescheduling, Please wait...');

        let sdata = {
          user_id: this.user_id,
          hospital_id: this.hospital_id,
          doctor_id: this.doctor_id,
          audioFilePath: this.audioFilePath,
          videoFilePath: this.videoFilePath,
          desc: this.desc,
          selectedTime: this.selectedTime,
          selectedTimeEnd: this.selectedTimeEnd,
          selectedDate: this.selectedDate,
          appointment_id: data.appointment_id,
        }
    
        this.allServices.sendData('schedule_appointment', sdata).subscribe(data => {
        this.loading.dismiss();
    
        let resdata:any = [];
        resdata = data;

        this.router.navigate(['/patientdashboard']);

        this.presentAlert(resdata.message);
        }, err => {
          console.log("error ====", err);
          this.loading.dismiss();
          let msg= err.error.errormsg;
          this.presentAlert(msg);
        })
        
      }
      else{

        this.showLoader('Scheduling, Please wait...');

        let sdata = {
          user_id: this.user_id,
          hospital_id: this.hospital_id,
          doctor_id: this.doctor_id,
          audioFilePath: this.audioFilePath,
          videoFilePath: this.videoFilePath,
          desc: this.desc,
          selectedTime: this.selectedTime,
          selectedTimeEnd: this.selectedTimeEnd,
          selectedDate: this.selectedDate,
          appointment_id: '',
        }
    
        this.allServices.sendData('schedule_appointment', sdata).subscribe(data => {
        this.loading.dismiss();
    
        let resdata:any = [];
        resdata = data;
        this.router.navigate(['/patientdashboard']);
        this.presentAlertWithNav(resdata.message);
        }, err => {
          console.log("error ====", err);
          this.loading.dismiss();
          let msg= err.error.errormsg;
          this.presentAlert(msg);
        })
      }
    });

    }  
*/

schApp(){
  console.log('ongoing')
}



}

