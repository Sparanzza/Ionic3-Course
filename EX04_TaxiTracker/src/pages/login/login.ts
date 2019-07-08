import { Component, ViewChild } from '@angular/core';
import {  IonicPage,
          NavController,
          NavParams,
          Slides,
          AlertController,
          LoadingController
        } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Slides) slides: Slides;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.slides.paginationType = 'progress';
    this.slides.freeMode = false;

  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            console.log(data);
            this.verifyUser(data.username);
          }
        }
      ]
    });
    alert.present();
  }

  verifyUser(clave: String){
    let loading = this.loading.create({
      content: 'Please wait...'
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);

  }
}