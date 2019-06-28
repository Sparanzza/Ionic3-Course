import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Item } from '../../interfaces/item.model';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingList$: Observable<Item[]>;

  constructor(
    public shopping: ShoppingListService,
    public navCtrl: NavController) {

      this.shoppingList$ 
        = this.shopping.getShoppingList() // db list
                  .snapshotChanges() // key and value
                  .map( 
                    changes =>{
                      return changes.map ( c => (
                        {
                          key: c.payload.key, ...c.payload.val()
                        }));
                    });

  }

}
