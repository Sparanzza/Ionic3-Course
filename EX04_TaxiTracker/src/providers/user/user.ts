import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  key: String;
  user: any = {};
  constructor(
    private afDB: AngularFirestore) {
      console.log('Hello UserProvider Provider');
  }

  verifyUser( key: String ){
    
    key = key.toLocaleLowerCase();
    
    return new Promise( (resolve , reject) =>{
      this.afDB.doc(`/taxiUsers/${key}`).valueChanges().subscribe(
        data =>{
          if (data){
            this.key = key;
            this.user = data;
            resolve(true);
            console.log(data);
          }else{
            console.log("no user found");
            resolve(false);
          }
        }
      );
    });
  }

}
