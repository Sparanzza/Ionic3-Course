import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UserProvider } from '../providers/user/user';
import { exists } from 'fs';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, 
    statusBar: StatusBar, splashScreen: SplashScreen,
    public _userProvider: UserProvider) {
    platform.ready().then(() => {

      _userProvider.loadStorage().then( exists =>{
        statusBar.styleDefault();
        splashScreen.hide();
        if(exists)
            this.rootPage = HomePage;
          else{
            this.rootPage = LoginPage;
          }
      });
    });
  }
}

