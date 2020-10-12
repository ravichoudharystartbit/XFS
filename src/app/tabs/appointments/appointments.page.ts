import { ViewChild, Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { MenuController, LoadingController,AlertController, NavController } from '@ionic/angular';

import { Storage } from '@ionic/storage';


import { ModalController } from '@ionic/angular';
import { ServiceForAllService } from '../../service-for-all.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'], 
})
export class AppointmentsPage implements OnInit {
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
  SessionLists = [];
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
  Role = '';
  isHoliday:any = '';

  page_title:any = '';
  dataReturned:any;
  constructor(
   public allServices:ServiceForAllService,
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
    
    
  }

  ngOnInit() { 
  }


  ionViewWillLeave() {
    this.menu.enable(true);
  }

  ionViewWillEnter() {
    this.SessionLists = [];
    this.menu.enable(false);
    //this.date = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0);
    this.getDaysOfMonth();
    // this.getWeekOfDays();

    this.loadEventThisMonth();
    // this.loadEventToday();

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

        this.Role = val.type;
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
    } else {
        this.currentDate = 999;
        this.selectDate(999);
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

  // console.log('sd: ', this.selectedDate);
  // this.GetRecentTopic(this.selectedDate);
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

  // console.log('total_days-----------------: ', total_days);

  let endDate1 = endDate.getFullYear()+"-"+(endDate.getMonth())+"-"+total_days;

  

  // this.route.params.subscribe(data => {
  //   if (data) {
  //     this.doctor_id = data.doctor_id;  
  //     this.hospital_id = data.hospital_id;

      // console.log('doctorData11: ', this.doctor_id);
      // console.log('hospitalID11: ', this.hospital_id);

      let todayD = (new Date());
    this.storage.get('user').then((val) => {
      if(val!=null){
        console.log(val)
        let dataToken = {
          token : val.token,
          type : val.type,
          month : startDate.getMonth()+1,
          year : endDate.getFullYear(),
        }
      this.showLoader('Please wait...');
      this.allServices.sendData('get_schedule_sessions', dataToken)
        .subscribe(data => {
          this.dismissLoading();

          let sl:any = [];
          sl = data;
          this.SessionLists = sl.Sessions;
          this.eventList = sl.Sessions;
          this.eventList = Array.from(new Set(this.eventList.map((item: any) => item.day)))
         
        },err=>{
          this.dismissLoading();
        });
      }
    });  
  //   }
  // });

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

  customday(day){
    if(this.currentDate === day){
      if(document.getElementById('cuDate'))
      document.getElementById('cuDate').classList.add('currentDate');
    }
    else{
      if(document.getElementById('cuDate'))
      document.getElementById('cuDate').classList.remove('currentDate');
    }
    setTimeout(() => {
      this.getCurrentDateBooking(this.selectedDate);
    },500);
    
  }
  getCurrentDateBooking(date){
    this.storage.get('user').then((val) => {
      if(val!=null){
        let dataToken = {
          token : val.token,
          date : date,
        }
        this.showLoader('Please wait...');
      this.allServices.sendData('get_schedule_sessions_by_date', dataToken)
        .subscribe(data => {
          this.dismissLoading();
          console.log('data', data)
          let sl:any = [];
          sl = data;
          this.SessionLists = sl.Sessions;
        }, err=>{
          this.dismissLoading();
        });
      }
    });
  }

  acceptSession(session){
    console.log('accept');
    this.storage.get('user').then((val) => {
      if(val!=null){
        let dataToken = {
          token : val.token,
          'session_id' : session.session_id,
          'type': 'accept'
        }
        this.showLoader('Please wait...');
      this.allServices.sendData('accept_decline_schedule_sessions', dataToken)
        .subscribe(data => {
          this.dismissLoading();
          let dataIndex = this.SessionLists.findIndex(x=> x.session_id == session.session_id);
          this.SessionLists[dataIndex].status = '2';
          this.presentAlert('Session accepted successfully.');
        }, err=>{
          this.dismissLoading();
        });
      }
    });
  }
  declineSession(session){
    console.log('decline');
    this.storage.get('user').then((val) => {
      if(val!=null){
        let dataToken = {
          token : val.token,
          'session_id' : session.session_id,
          'type': 'decline'
        }
        this.showLoader('Please wait...');
        this.allServices.sendData('accept_decline_schedule_sessions', dataToken)
          .subscribe(data => {
          this.dismissLoading();
          let dataIndex = this.SessionLists.findIndex(x=> x.session_id == session.session_id);
          this.SessionLists[dataIndex].status = '3';
          this.presentAlert('Session declined successfully.');
        }, err=>{
          this.dismissLoading();
        });
      }
    });
  }
 
}

