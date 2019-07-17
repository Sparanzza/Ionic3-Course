import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EX04-TaxiDesktop';
  lat: number = 51.678418;
  lng: number = 7.809007;
}
