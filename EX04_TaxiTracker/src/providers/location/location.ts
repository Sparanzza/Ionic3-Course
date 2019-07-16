import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserProvider } from '../user/user';

@Injectable()
export class LocationProvider {


  taxiDriver: AngularFirestoreDocument<any>;
  constructor(
    public db: AngularFirestore,
    public _userProvider: UserProvider,
    private geolocation: Geolocation
  ) {
    console.log('Hello LocationProvider Provider');
    this.taxiDriver = db.doc(`/taxiUsers/${_userProvider.key}`);

  }

  initGeo(){

  this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
    console.log(resp.coords);
    this.taxiDriver.update({
      lat: resp.coords.latitude,
      lng: resp.coords.longitude,
      clave: this._userProvider.key
      
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log("watch: " , data.coords);
      this.taxiDriver.update({
        lat: data.coords.latitude,
        lng: data.coords.longitude,
        clave: this._userProvider.key
        
      });
    });

   }).catch((error) => {
     console.log('Error getting location', error);
   });
  }

}
