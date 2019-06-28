import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Platform } from 'ionic-angular';
/*
  Generated class for the PushnotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushnotificationProvider {

  constructor(
    private platform: Platform,
    private oneSignal: OneSignal) {
    console.log('Hello PushnotificationProvider Provider');
  }

  init_notifications(){
    if ( this.platform.is('cordova'))
    {
      this.oneSignal.startInit('2431324d-7bb8-4246-9cc9-9871b9a05705', '84357539434');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
        console.log('notification recieved');
      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
        console.log('notification opened');
      });
  
      this.oneSignal.endInit();
    }else{
        // OneSignal Code start:
        // Enable to debug issues:
        // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

        var notificationOpenedCallback = function(jsonData) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        window["plugins"].OneSignal
          .startInit("2431324d-7bb8-4246-9cc9-9871b9a05705", "84357539434")
          .handleNotificationOpened(notificationOpenedCallback)
          .endInit();

    }
  }

}
