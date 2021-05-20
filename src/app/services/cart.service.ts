import { Injectable } from '@angular/core';
import {Product} from '../models/Product';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject([]);
  sharedCart = this.cart.asObservable();

  constructor() { }

  addProduct = (product: Product) => {
    const currentProducts = this.cart.getValue();
    // @ts-ignore
    this.cart.next([...currentProducts, product]);
  }

  clearCart = () => {
    this.cart.next([]);
  }
}
