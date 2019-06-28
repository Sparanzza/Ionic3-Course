import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// Plugins
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { PushnotificationProvider } from '../providers/pushnotification/pushnotification';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    OneSignal,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PushnotificationProvider
  ]
})
export class AppModule {}
