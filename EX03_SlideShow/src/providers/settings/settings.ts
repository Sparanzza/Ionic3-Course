import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';


/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  setting =  {
    showTutorial: true
  }

  constructor(private storage: Storage , private platform: Platform) { }

  loadStorage(){

    let promise = new Promise ((resolve , reject) =>{
      if(this.platform.is("cordova")){
        //Device
        console.log("init cordova storage");
        this.storage.ready().then( ()=>{
          console.log("storage ready");
          this.storage.get("setting").then((_set)=>{
            if (_set){
              this.setting = _set;
            }
            resolve();
          });
        });

      }else{
        //Desktop
        if (localStorage.getItem("setting"))
          this.setting = JSON.parse (localStorage.getItem("setting"));
      }
      resolve();
    });

    return promise;
  }

  saveStorage(){
    if(this.platform.is("cordova")){
      //Device
      this.storage.ready().then( ()=>{
        this.storage.set("setting", this.setting);
        });
    }else{
      //Desktop
      localStorage.setItem("setting", JSON.stringify(this.setting));
    }

  }

}
