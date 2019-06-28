import { Item } from './../../interfaces/item.model';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable()
export class ShoppingListService {

    private shoppingListRef = this.db.list<Item>('shopping-list');

    constructor( private db: AngularFireDatabase ){

    }

    getShoppingList( ){
        return this.shoppingListRef;
    }

    addItem( item: Item){
        return this.shoppingListRef.push(item);
    }
}