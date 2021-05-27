import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../../services/cart.service';
import {RestApiService} from '../../../services/rest-api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  total;
  fullName: string;
  address: string;
  email: string;
  phoneNumber: string;
  cardNumber: string;

  constructor(private router: Router, private cartService: CartService, private restApiService: RestApiService) { }

  ngOnInit(): void {
    this.cartService.sharedCart.subscribe(cart => this.total = cart.reduce( ( sum, { price } ) => sum + price , 0));
  }

  processPayment = () => {
    const newArray = [];
    this.cartService.sharedCart.forEach(productsArray => productsArray.forEach(product => newArray.push(product)));

    const productMap = new Map();
    newArray.forEach(product => {
      let quantity;
      const existingProduct = productMap.get(product.id);

      if (existingProduct) {
        quantity = existingProduct.quantity + 1;
      } else {
        quantity = 1;
      }
      productMap.set(product.id, {id: product.id, quantity});
    });

    const order = [];
    productMap.forEach( value => {
      order.push( {productId: value.id, quantity: value.quantity} );
    });

    this.restApiService.addOrder(order)
      .subscribe(data => {
        this.cartService.clearCart();
        this.router.navigate(['user/confirmation']);
      }, error => {
        console.log(error);
      });
  }
}
