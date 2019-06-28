import { UploadPage } from './../upload/upload.page';
import { Component } from '@angular/core';
import { NavController , ModalController } from '@ionic/angular';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  posts: Observable<any[]>;

  constructor (
  private modalCtrl: ModalController,
  private afDB: AngularFireDatabase) {
    this.posts = afDB.list('post').valueChanges();
  }


  async showModal () {
    const modal = await this.modalCtrl.create( {
      component: UploadPage,
      componentProps: { value: 123 }
    } );
    return await modal.present();
  }
}
