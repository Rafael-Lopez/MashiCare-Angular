import { Component, OnInit } from '@angular/core';
import {faPrescriptionBottleAlt} from '@fortawesome/free-solid-svg-icons';
import {RestApiService} from '../../services/rest-api.service';
import {User} from '../../models/User';
import {UserAuthenticationService} from '../../services/user-authentication.service';
import {Product} from '../../models/Product';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: any;
  filteredProducts: any;
  authenticatedUser: User | null;

  constructor(private userAuthenticationService: UserAuthenticationService,
              private restApiService: RestApiService,
              private cartService: CartService) {
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
        this.filteredProducts = [];

        data.forEach((product: any) => {
          product.icon = faPrescriptionBottleAlt;
          product.addProductToCartCallback = this.addProductToCart;

          this.products.push(product);
          this.filteredProducts.push(product);
        });
      });
  }

  addProductToCart = (product: Product) => {
    this.cartService.addProduct(product);
  }

  resetProducts = () => {
    this.filteredProducts = this.products;
  }

  onFilteredProducts = (filteredProducts: any) => {
    this.filteredProducts = filteredProducts;
  }

}
