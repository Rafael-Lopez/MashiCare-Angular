import { Component, OnInit } from '@angular/core';
import {faPlus, faPrescriptionBottleAlt} from '@fortawesome/free-solid-svg-icons';

import {RestApiService} from '../../../services/rest-api.service';
import {Product} from '../../../models/Product';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: any;
  constructor(private restApiService: RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts = () => {
    this.restApiService.getProducts()
      .subscribe(data => {
        this.products = [];

        data.forEach((product: any) => {
          product.icon = faPrescriptionBottleAlt;
          product.deleteCallback = this.deleteProduct;
          product.updateCallback = this.updateProduct;
          this.products.push(product);
        });

        const newProduct = new Product();
        newProduct.icon = faPlus;
        newProduct.addCallback = this.addProduct;
        this.products.push(newProduct);
      });
  }

  addProduct = () => {
    this.router.navigate(['management/dashboard/edit-product']);
  }

  deleteProduct = (productId: number) => {
    this.restApiService.deleteProduct(productId)
      .subscribe(data => {
          this.getProducts();
        },
        error => alert('Error while deleting product!'));
  }

  updateProduct = (product: any) => {
    const productStr = JSON.stringify(product);
    this.router.navigateByUrl('management/dashboard/edit-product', { state: { product: productStr } });
  }

}
