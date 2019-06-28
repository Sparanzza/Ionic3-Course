import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroductionPage } from '../pages/introduction/introduction';
import { HomePage } from '../pages/home/home';
import { SettingsProvider } from '../providers/settings/settings';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = IntroductionPage;
  // rootPage:any = HomePage;

  constructor(private platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private _setting : SettingsProvider ) {
    platform.ready().then(() => {

      this._setting.loadStorage().then(
        ()=>{

          if (this._setting.setting.showTutorial){
            this.rootPage = IntroductionPage;
          }else{
            this.rootPage = HomePage;
          }

          this.platform.pause.subscribe(()=>{ console.log("The App will be paused");});
          this.platform.resume.subscribe(()=>{ console.log("The App will be resumed");});
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar.styleDefault();
          splashScreen.hide();
        }
      );
    });
  }
}

