import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { catchError, tap, map, retry } from 'rxjs/operators';
let wpUrl = 'https://xfs.betaplanets.com/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ServiceForAllService {


  url = 'https://xfs.betaplanets.com/wp-json/wp/v1/';
  totalPosts = null;
  pages: any;

  constructor(private http: HttpClient) {
  }


 /* getOrders() {
    return this.http.get('http://xfs.betaplanets.com/wp-json/wc/v1/products?consumer_key=ck_3c2334deaf231a36ec38b68d0481c8aab96c6453&consumer_secret=cs_2c88d1b9012ae4cae0e081fc69ba67de4716967b', {
      'jw_auth_sec': "wivxCNm$<(+WFwivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$#7}1]wivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$TWMUl7OaU*TxS(r*$"
    })
  } */

  doRegister(user_data,form_type) {
    return this.http.post(wpUrl + 'wp-json/mobileapi/v1/register', {
      user_data:user_data,
      form_type:form_type,
      jw_auth_sec: "wivxCNm$<(+WFwivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$#7}1]wivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$TWMUl7OaU*TxS(r*$"
    })
  }


  getVideos() {
    return this.http.get(
      'http://101.betaplanets.com/wp-json/mobileapi/v1/getVimeoVideo')
        .pipe(
          retry(2), 
          map(content => {
            return content;
          })
        )
  }

  getProducts(){
    return this.http.get('https://xfs.betaplanets.com/wc-api/v3/products?consumer_key="ck_025c7377b0a7a9cff3723bfda95f6c8004d25301"&consumer_secret="cs_455cf6a85f9dcccdf2f31c0fdbcd822f65c5bac4"').pipe(
          retry(2),
          map(content => {
            return content;
          })
        )
  }
  getUser(){
    return this.http.get('https://xfs.betaplanets.com/wc-api/v3/products?consumer_key="ck_025c7377b0a7a9cff3723bfda95f6c8004d25301"&consumer_secret="cs_455cf6a85f9dcccdf2f31c0fdbcd822f65c5bac4"').pipe(
          retry(2),
          map(content => {
            return content;
          })
        )
  }
  updateUserSession(userId , apiCCId){
    return this.http.get('https://xfs.betaplanets.com/wc-api/v3/products?consumer_key="ck_025c7377b0a7a9cff3723bfda95f6c8004d25301"&consumer_secret="cs_455cf6a85f9dcccdf2f31c0fdbcd822f65c5bac4"').pipe(
          retry(2),
          map(content => {
            return content;
          })
        )
  }
  getCallerProfile(userI){
    return this.http.get('https://xfs.betaplanets.com/wc-api/v3/products?consumer_key="ck_025c7377b0a7a9cff3723bfda95f6c8004d25301"&consumer_secret="cs_455cf6a85f9dcccdf2f31c0fdbcd822f65c5bac4"').pipe(
          retry(2),
          map(content => {
            return content;
          })
        )
  }

  getAllProducts(){
    return this.http.get(wpUrl + 'wp-json/mobileapi/v1/getAllProducts').pipe(
          retry(2),
          map(content => {
            return content;
          })
        )
  }

  getAllNews(){
    return this.http.get(wpUrl + 'wp-json/mobileapi/v1/getAllNews').pipe(
          retry(2),
          map(content => {
            return content;
          })
        )
  }
  

  createNewUser(user_data) {
    return this.http.post(wpUrl + 'wp-json/mobileapi/v1/createNewUser', {
      user_data:user_data,
      jw_auth_sec: "wivxCNm$<(+WFwivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$#7}1]wivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$TWMUl7OaU*TxS(r*$"
    })
  }


  doLogin(email, password) {
    return this.http.post(wpUrl + 'wp-json/jwt-auth/v1/token', {
      username: email,
      password: password,
    })
  }


  verifyEmail(email) {
    return this.http.post(wpUrl + 'wp-json/mobileapi/v1/verifyEmail', {
      email: email,
    })
  }

  getCategory() {
    return this.http.post(wpUrl + 'wp-json/mobileapi/v1/fetch_cat', {
      user_login: 1
    }).pipe(
      map((user) => {
        return user;
      })
    )
  }

  doReset(user_login) {
    return this.http.post(wpUrl + 'wp-json/mobileapi/v1/retrieve_password', {
      user_login: user_login
    }).pipe(
      map((user) => {
        return user;
      })
    )
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }

  getUsers(token) {
    return this.http.post(wpUrl + 'wp-json/mobileapi/v1/GetUserProfile', {
      token: token
    }).pipe(
      map((user) => {
        return user;
      })
    )
  }
  
 

  updateProfile(token,user_data,role:any='user') {
    return this.http.post(wpUrl + 'wp-json/mobileapi/v1/updateUserProfile', {
      token:token,
      user_data:user_data,
      jw_auth_sec: "wivxCNm$<(+WFwivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$#7}1]wivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$TWMUl7OaU*TxS(r*$"
    })
  }


  changePassword(changePassword,token){
    return this.http.post(wpUrl + 'wp-json/mobileapi/changePassword', {
      token:token,
      password: changePassword.password,
      confirm_password: changePassword.confirm_password,
      jw_auth_sec: "wivxCNm$<(+WFwivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$#7}1]wivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$TWMUl7OaU*TxS(r*$"
    })
  }




  changeUserPassword(token , changePassword){
    return this.http.post(wpUrl + 'wp-json/mobileapi/v1/changeUserPassword', {
      token:token,
      PasswordData: changePassword,
      jw_auth_sec: "wivxCNm$<(+WFwivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$#7}1]wivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$TWMUl7OaU*TxS(r*$"
    })
  }
  

  getPageContent(page: number = 1) {
    //if we want to query posts by category
    return this.http.get(
      wpUrl +
        'wp-json/wp/v2/pages/' + page)
        .pipe(
          retry(2), 
          map(content => {
            return content;
          })
        )
  }



 
  //get_fav

  get_fav(token,paged){
    return this.http.post(wpUrl + 'wp-json/mobileapi/v1/get_fav',{
    token:token,
    paged:paged,
    jw_auth_sec: "wivxCNm$<(+WFwivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$#7}1]wivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$TWMUl7OaU*TxS(r*$"
    }).pipe(
          retry(2),
          map(content => {
            return content;
          })
        )
  }

  SaveAsFav(token,offer){
    return this.http.post(wpUrl + 'wp-json/mobileapi/v1/func_save_offer_as_favorite_app',{
    token:token,
    offer_id:offer
    }).pipe(
          retry(2),
          map(content => {
            return content;
          })
        )
  } 

  
  updateToken(userToken, deviceID, deviceData, status) {
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   return this.http.post(wpUrl + "wp-json/mobileapi/v1/updateDeviceToken", {
       token: userToken,
       deviceID: deviceID,
       deviceData: deviceData,
       status: status,
       timezone:timezone 

   })
  }


  sendPushNotification(id,msg,name,senderID){
    return this.http.post(wpUrl+ 'wp-json/mobileapi/v1/sendPushNotification', {
      jw_auth_sec: "3t]HdSq_0]SIlU)7e9I +S_89PK=vehgfvghewr43gr43r43g34rt34gr4h3grh3grhT+Pj<V8%v0M6H|,y+_tf]x5XAw5dYy6VM,;(",
      id:id, 
      msg:msg,
      name:name,
      senderID:senderID
    })
  
   }

   sendPushNotificationWeb(callid ,id,msg,name,senderID ,active ){
     return this.http.post(wpUrl+ 'wp-json/mobileapi/v1/sendPushNotification', {
       jw_auth_sec: "3t]HdSq_0]SIlU)7e9I +S_89PK=vehgfvghewr43gr43r43g34rt34gr4h3grh3grhT+Pj<V8%v0M6H|,y+_tf]x5XAw5dYy6VM,;(",
       id:id, 
       msg:msg,
       name:name,
       senderID:senderID
     })
   
    }
  
  

  getpagebyslug(token,slug){
    return this.http.post(wpUrl + 'wp-json/mobileapi/v1/getpagebyslug',{
    token:token,
    slug:slug,
    }).pipe(
          retry(2),
          map(content => {
            return content;
          })
        )
  }

    

 
  
    

  createPDF(token){
    return this.http.post(wpUrl + 'wp-json/mobileapi/v1/createPDF',{
    token:token,
    }).pipe(
          retry(2),
          map(content => {
            return content;
          })
        )
  }

  

  sendMail(token){
    return this.http.post(wpUrl + 'wp-json/mobileapi/v1/sendMail',{
    token:token,
    }).pipe(
          retry(2),
          map(content => {
            return content;
          })
        )
  }


  getUserProfileData(token) {
    return this.http.post(wpUrl + 'wp-json/mobileapi/v1/getUserProfileData', {
      token: token
    }).pipe(
      map((user) => {
        return user;
      })
    )
  }

  
}
