import { LoadFileService } from './../services/load-file.service';
import { Component, OnInit } from '@angular/core';
import {  NavController , ModalController, NavParams} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  title = '';
  imgPreview = '';
  img64: string;

  constructor(
    private _lfs: LoadFileService,
    private imagePicker: ImagePicker,
    private camera: Camera,
    public modalCtrl: ModalController,
    private params: NavParams) {  }


  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  showCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };


    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imgPreview = 'data:image/jpeg;base64,' + imageData;
      this.img64 = imageData;
     }, (err) => {
      // Handle error
      console.log('ERROR CAMERA' , JSON.stringify(err));
     });
   }

   showGallery() {
    const options: ImagePickerOptions = {
      quality: 100,
      outputType: 1,
      maximumImagesCount: 1,
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (let i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.imgPreview = 'data:image/jpeg;base64,' + results[i];
          this.img64 = results[i];
      }
    }, (err) => {
      console.log('ERROR SELECTOR' , JSON.stringify(err));
    });
   }

   createPost() {
     const file = {
        img: this.img64,
        title: this.title
     };

     this._lfs.loadImageFirebase(file).then(() => {
       this.closeModal();
     });
   }

}
