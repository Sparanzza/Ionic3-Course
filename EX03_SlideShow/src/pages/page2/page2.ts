import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the Page2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
})
export class Page2Page {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private alertCtrl: AlertController,
     public loadingCtrl: LoadingController) {
  }

  gotoPage3(){
    this.navCtrl.push("myPage3"); 
  }
  ionViewDidLoad(){
    console.log("ionViewDidLoad");
  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter");
  }
  ionViewDidEnter(){
    console.log("ionViewDidEnter");
  }
  ionViewWillLeave(){
    console.log("ionViewWillLeave");
  }
  ionViewDidLeave(){
    console.log("ionViewDidLeave");
  }
  ionViewWillUnload(){
    console.log("ionViewWillUnload");
  }
  ionViewCanEnter(){
    console.log("ionViewCanEnter");
    //let number = Math.round(Math.random()*10);
    //console.log(number);
    //if (number > 5) return true;

    let loading = this.loadingCtrl.create({
      content:"Wait..."
    });
    loading.present();
    let promiseAccept = new Promise( (resolve, reject)=> {

      setTimeout(() => {
        loading.dismiss();
        resolve(true);
      }, 2000);

      const alert = this.alertCtrl.create({
        title: 'New Friend!',
        subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
        buttons: [
          {
            text: 'Cancel',
            handler: (data) => {
              console.log('Cancel clicked');
              resolve(false);
            }
          },
          {
            text: 'Accept',
            handler: (data) => {
              console.log('Saved clicked');
              resolve(true);
            }
          }
        ]
      });
      alert.present();
    });
    return promiseAccept;
  }
  ionViewCanLeave(){
    console.log("ionViewCanLeave");
    console.log("Wait 2 seconds to exit");
    let promise = new Promise( (resolve, reject)=>{
      setTimeout(() =>{ 
        resolve(true) }, 2000);
    });
    return false;
  }

}
