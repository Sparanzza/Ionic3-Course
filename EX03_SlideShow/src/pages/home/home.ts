import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Page2Page } from '../page2/page2';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  page2 = Page2Page;
  
  constructor(public navCtrl: NavController) {

  }

}
