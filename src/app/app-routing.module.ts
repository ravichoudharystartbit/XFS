import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'signup_option',
    loadChildren: './signup_option/signup_option.module#SignupOptionPageModule'
  },
  {
    path: 'signup_option_step2',
    loadChildren: './signup_option_step2/signup_option_step2.module#SignupOptionStep2PageModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'verify_email',
    loadChildren: './verify_email/verify_email.module#VerifyEmailPageModule'
  },
  {
    path: 'details',
    loadChildren: './details/details.module#DetailsPageModule'
  },
  {
    path: 'persional_info',
    loadChildren: './persional_info/persional_info.module#PersionalInfoPageModule'
  },
  {
    path: 'instructions',
    loadChildren: './instructions/instructions.module#InstructionsPageModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilePageModule'
  },
  {
    path: 'editprofile',
    loadChildren: './edit_info/edit_info.module#EditInfoPageModule'
  },
  {
    path: 'change_password',
    loadChildren: './change_password/change_password.module#ChangePasswordPageModule'
  },
  {
    path: 'watch_videos',
    loadChildren: './watch_video/watch_video.module#WatchVideosPageModule'
  },
  {
    path: 'store',
    loadChildren: './store/store.module#StorePageModule'
  },
  {
    path: 'product_details',
    loadChildren: './product_details/product_details.module#ProductDetailsPageModule'
  },
  {
    path: 'contact',
    loadChildren: './contact/contact.module#ContactPageModule'
  },
  {
    path: 'payment_slide',
    loadChildren: './payment_slide/payment_slide.module#PaymentSlidePageModule'
  },
  {
    path: 'payment',
    loadChildren: './payment/payment.module#PaymentPageModule'
  },
  {
    path: 'wishlist',
    loadChildren: './wishlist/wishlist.module#WishlistPageModule'
  },
  {
    path: 'scheduleSession',
    loadChildren: './scheduleSession/scheduleSession.module#ScheduleSessionPageModule'
  },
  {
    path: 'scheduleUserView',
    loadChildren: './scheduleUserView/scheduleUserView.module#ScheduleUserViewPageModule'
  },
  {
    path: 'schedule',
    loadChildren: './schedule/schedule.module#SchedulePageModule'
  },
  { 
    path: 'chat', 
    loadChildren: './chat/chat.module#ChatPageModule' 
  },
  { 
    path: 'messages', 
    loadChildren: './messages/messages.module#MessagesPageModule' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


