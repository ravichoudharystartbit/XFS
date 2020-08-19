import { Component, OnInit } from "@angular/core";
import {
	Validators,
	FormBuilder,
	FormGroup,
	FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import {
	ModalController,
	MenuController,
	LoadingController,
	AlertController,
	NavController
} from "@ionic/angular";
import { ServiceForAllService } from '../service-for-all.service';
@Component({
	selector: "app-forgot",
	templateUrl: "./forgot.page.html",
	styleUrls: ["./forgot.page.scss"]
})
export class ForgotPage implements OnInit {
	error_message: any; 
	forgotForm: FormGroup;
	response: any;
	loading: any;
	EmailError: boolean = true;
	EmailErrorMsg = '';
	validation_messages = {
		userEmail: [
			{ type: "required", message: "Email is required." },
			{ type: "pattern", message: "Enter a valid email." }
		]
	};
	constructor(
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public navController: NavController,
		public webService: ServiceForAllService,
		private router: Router,
		public menu: MenuController
	) {
		this.forgotForm = new FormGroup({
			userEmail: new FormControl(
				"",
				Validators.compose([
					Validators.required,
					Validators.pattern(
						"^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$"
					)
				])
			)
		});
	}

	ngOnInit() {}
	doForgotPassword(value) {
		let userEmail = this.forgotForm.value.userEmail;
		this.showLoader();
		this.webService.doReset(userEmail).subscribe(
			result => {
				this.response = result;
				this.presentAlert(this.response.msg);
				
				this.dismissLoading();
			},
			err => {
				this.dismissLoading();
				
				let msg: any = [];
				msg = err.error.msg;
				this.presentAlert(msg);
			}
		);
	}

	async showLoader() {
		this.loading = await this.loadingCtrl.create({
			message: "Please wait...",
			cssClass: "custom-load"
		});
		this.loading.present();
	}

	async presentAlert(msg) {
		let alert = await this.alertCtrl.create({
			header: "Alert",
			message: msg,
			buttons: ["OK"]
		});

		await alert.present();
	}
	async dismissLoading() {
		await this.loading.dismiss();
	}

	emailValidate($event:any){
		
		let key = '';		
		  let theEvent = $event;
		  key = theEvent.target.value;
		
		 let regx = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
		 if( regx.test(key) ) {      
		  this.EmailError = false;
		  
		}    
		else{
		  this.EmailError = true;
		  this.EmailErrorMsg = 'Invalid email address.';
		} 
	   }
}

						// "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"