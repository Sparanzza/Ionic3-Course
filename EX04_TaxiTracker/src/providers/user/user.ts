import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  key: String;
  user: any = {};

  private doc:Subscription;

  constructor(
    private platform: Platform,
    private storage:Storage,
    private afDB: AngularFirestore) {
      console.log('Hello UserProvider Provider');
  }

  verifyUser( key: String ){
    
    key = key.toLocaleLowerCase();
    
    return new Promise( (resolve , reject) =>{
      this.doc = this.afDB.doc(`/taxiUsers/${key}`).valueChanges().subscribe(
        data =>{
          if (data){
            this.key = key;
            this.user = data;
            this.saveStorage();
            resolve(true);
            console.log(data);

          }else{
            console.log("no user found");
            resolve(false);
          }
        }
      );
    });
  }

  saveStorage(){
    if (this.platform.is('cordova')){
      this.storage.set('key' , this.key);
    }else{
      localStorage.setItem('key', <string>this.key);
    }
  }

  loadStorage(){

    return new Promise( (resolve, reject) =>{
      if(this.platform.is('cordova')){
        this.storage.get('key').then(val =>{
          if(val){
            this.key = val;
            resolve(true);
          }else{
            resolve(false);
          }
        });
      }else{
        if(localStorage.getItem('key')){
          this.key = localStorage.getItem('key');
          resolve(true);
        }else{
          resolve(false);
        }
      }
    });
  }

  deleteUser(){
    this.key = null;

    if( this.platform.is('cordova')){
      this.storage.remove('key');
    }else{
      localStorage.removeItem('key');
    }

    this.doc.unsubscribe();
  }
}
