import { Component, ViewChild } from '@angular/core';
import {  IonicPage,
          NavController,
          Slides,
          AlertController,
          LoadingController
        } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


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
    public loading: LoadingController,
    public _userprovider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.slides.paginationType = 'progress';
    this.slides.freeMode = false;
    this.slides.lockSwipes(true);
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
            this.verifyUser(data.username);
          }
        }
      ]
    });
    alert.present();
  }

  verifyUser(key: String){
    let loading = this.loading.create({
      content: 'Please wait...'
    });

    this._userprovider.verifyUser(key).then( user =>{
      loading.present();
      if (user){
        this.slides.freeMode = false;
        this.slides.lockSwipes(true);
        this.slides.slideNext();
        this.slides.freeMode = true;
        this.slides.lockSwipes(false);
      }else{
        this.alertCtrl.create({
          title: 'No user found!',
          subTitle: 'try to insert amun-1',
          buttons: ['OK']
        }).present();
      }

    });

    setTimeout(() => {
      loading.dismiss();
    }, 2000);

  }
}