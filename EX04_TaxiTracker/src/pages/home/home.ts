import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public locProvider: LocationProvider,
    public navCtrl: NavController) {
        locProvider.initGeo();
  }

}
