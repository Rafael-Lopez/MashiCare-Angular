import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../../services/cart.service';

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

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.sharedCart.subscribe(cart => this.total = cart.reduce( ( sum, { price } ) => sum + price , 0));
  }
}
