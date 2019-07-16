import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: number;
  lng: number;

  user:any= {}
  constructor(
    public locProvider: LocationProvider,
    public userProvider: UserProvider,
    public navCtrl: NavController) {
        locProvider.initGeo();

        // console.log(this.user);
        this.locProvider.taxiDriver.valueChanges()
          .subscribe( data =>{
            console.log(data);
            this.user = data;
          });
  }

  onClickExit(){
    this.locProvider.stopGeo();
    this.userProvider.deleteUser();
    this.navCtrl.setRoot(LoginPage);

  }

}
