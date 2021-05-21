import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/Product';
import {CartService} from '../../../services/cart.service';
import {Router} from '@angular/router';
import {UserAuthenticationService} from '../../../services/user-authentication.service';
import {User} from '../../../models/User';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  authenticatedUser: User | null;
  products: Product[] = [];
  total = 0;

  constructor(private cartService: CartService, private router: Router,
              private userAuthenticationService: UserAuthenticationService) {
    this.cartService.sharedCart.subscribe(cart => this.products = cart);
    this.userAuthenticationService.sharedAuthenticatedUser.subscribe(
      authenticatedUser => this.authenticatedUser = authenticatedUser);
  }

  ngOnInit(): void {
    this.calculateTotal();
  }

  calculateTotal = () => {
    this.products.forEach( product => {
      this.total += product.price;
    });
  }

  doClearCart = () => {
    this.cartService.clearCart();
  }

  doCheckout = () => {
    this.router.navigate(['user/checkout']);
  }

  redirectToLogin = () => {
    this.router.navigate(['user/login', 'redirect']);
  }
}
