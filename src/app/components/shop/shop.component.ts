import { Component, OnInit } from '@angular/core';
import {faPlus, faPrescriptionBottleAlt} from '@fortawesome/free-solid-svg-icons';
import {Product} from '../../models/Product';
import {RestApiService} from '../../services/rest-api.service';
import {User} from '../../models/User';
import {UserAuthenticationService} from '../../services/user-authentication.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: any;
  authenticatedUser: User | null;

  constructor(private userAuthenticationService: UserAuthenticationService, private restApiService: RestApiService) {
    this.authenticatedUser = null;
  }

  ngOnInit(): void {
    this.userAuthenticationService.sharedAuthenticatedUser.subscribe(
      authenticatedUser => this.authenticatedUser = authenticatedUser);
    this.getProducts();
  }

  getProducts = () => {
    this.restApiService.getProducts()
      .subscribe(data => {
        this.products = [];

        data.forEach((product: any) => {
          product.icon = faPrescriptionBottleAlt;
          this.products.push(product);
        });
      });
  }

}
