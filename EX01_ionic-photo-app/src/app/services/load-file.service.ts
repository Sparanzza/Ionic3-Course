import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { runInThisContext } from 'vm';


@Injectable({
  providedIn: 'root'
})
export class LoadFileService {

  imgs: UploadFile [] = [];
  constructor(
    public afdb: AngularFireDatabase,
    public toastController: ToastController) { }

  loadImageFirebase ( file: UploadFile )  {

    const promise = new Promise( ( resolve , reject) => {
      this.presentToast('loading image');
      const storeRef = firebase.storage().ref();
      const fileName: string = new Date().valueOf().toString();
      const uploadTask: firebase.storage.UploadTask = storeRef.child(`img/${fileName}`)
                      .putString(file.img, 'base64', {contentType: 'image/jpeg'});
          uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          () => {  }, // percent mbs
          (error) => {  // handle error
            console.log('ERROR TO LOAD');
            console.log(JSON.stringify(error));
            this.presentToast(JSON.stringify(error));
            reject();
          },
          () => {
            // All right
            // create register
            console.log('uploaded');
            this.presentToast('Image loaded!');

            const url = uploadTask.snapshot.downloadURL;
            this.createPost(file.title , file.img , url);
            resolve();
          }
          );
    });

    return promise;
  }

  private createPost( title: string, url: string, filename: string) {

    const post: UploadFile = {
      img: url,
      title: title,
      key: filename
    };
    // this.afdb.list('/post').push(post);
    this.afdb.object(`/post/${filename}`).update(post)
        .then(_ => console.log('success'))
        .catch(err => console.log(err, 'You dont have access!'));
        this.imgs.push(post);


  }

  async presentToast( message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}

interface UploadFile {
  title: string;
  img: string;
  key?: string;
}
