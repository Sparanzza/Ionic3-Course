import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'EX04-TaxiDesktop';
  public lat = 51.678418;
  public lng = 7.809007;
  taxiDrivers: TaxiDriver[] = [];
  public followedDriver: TaxiDriver = null;

  init = false;
  constructor(db: AngularFirestore) {
    db.collection('taxiUsers/').valueChanges()
    .subscribe( (data: TaxiDriver[]) => {
      this.taxiDrivers = data;
      console.log(data);
      // place the first point
      if (!this.init) {
        this.lat = data[0].lat;
        this.lng = data[0].lng;
        this.init = true;
      }

      if(this.followedDriver){
        data.forEach( d =>{
          if(d.clave === this.followedDriver.clave){
            this.lat = d.lat;
            this.lng = d.lng;
          }
        });
      }
    });
  }
  followDriver( driver: TaxiDriver){
   console.log(driver.name);
   this.followedDriver = driver;
   this.lat = driver.lat;
   this.lng = driver.lng;
  }

  unfollow(){
    this.followedDriver = null;
  }
}




interface TaxiDriver {
  name: string;
  clave: string;
  lat: number;
  lng: number;
}
