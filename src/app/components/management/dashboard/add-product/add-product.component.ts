import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../../../models/Product';
import {RestApiService} from '../../../../services/rest-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    seller: new FormControl(''),
    price: new FormControl(0)
  });
  constructor(private restApiService: RestApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const product = new Product();
    product.name = this.addProductForm.value.name;
    product.seller = this.addProductForm.value.seller;
    product.description = this.addProductForm.value.description;
    product.price = this.addProductForm.value.price;
    this.addProduct(product);
  }
  cancel(): void {
    this.router.navigate(['management/dashboard']);
  }

  addProduct(product: Product): void {
    this.restApiService.addProduct(product)
      .subscribe( data => {
          this.router.navigate(['management/dashboard']);
        },
        error => alert('Product could not be added!') );
  }
}
