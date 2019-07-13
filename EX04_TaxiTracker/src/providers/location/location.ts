import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationProvider {

  constructor(
    private geolocation: Geolocation
  ) {
    console.log('Hello LocationProvider Provider');
  }

  initGeo(){

  this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
    console.log(resp.coords);

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
    console.log("watch: " , data.coords);
    });

   }).catch((error) => {
     console.log('Error getting location', error);
   });
  }

}
