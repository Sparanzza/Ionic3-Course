import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UploadPage } from './upload/upload.page';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Enviroment
import { environment } from './../environments/environment';
import { PlaceholderPipe } from './pipes/placeholder.pipe';
import { FormsModule } from '@angular/forms';

// Plugins
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import {LoadFileService} from './services/load-file.service';


@NgModule({
  declarations: [
    AppComponent,
    UploadPage,
    PlaceholderPipe
  ],
  entryComponents: [
    AppComponent,
    UploadPage],
  imports: [
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    Camera,
    ImagePicker,
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoadFileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
