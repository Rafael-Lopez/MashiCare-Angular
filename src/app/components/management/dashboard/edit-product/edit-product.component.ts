import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../../../models/Product';
import {RestApiService} from '../../../../services/rest-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  addProductForm: any;
  selectedProduct: Product | null;

  constructor(private restApiService: RestApiService, private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      const productStr = this.router.getCurrentNavigation()?.extras.state?.product;
      this.selectedProduct = JSON.parse(productStr);
      this.addProductForm = new FormGroup({
        name: new FormControl(this.selectedProduct?.name),
        description: new FormControl(this.selectedProduct?.description),
        seller: new FormControl(this.selectedProduct?.seller),
        price: new FormControl(this.selectedProduct?.price),
        enabled: new FormControl(this.selectedProduct?.enabled),
      });
    } else {
      this.selectedProduct = null;
      this.addProductForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        seller: new FormControl(''),
        price: new FormControl(0),
        enabled: new FormControl(true)
      });
    }
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['management/dashboard']);
  }

  addProduct(): void {
    const product = this.populateProductFromForm();

    this.restApiService.addProduct(product)
      .subscribe( data => {
          this.router.navigate(['management/dashboard']);
        },
        error => alert('Product could not be added!') );
  }

  updateProduct(): void {
    const product = this.populateProductFromForm();
    product.id = this.selectedProduct?.id;

    this.restApiService.updateProduct(product)
      .subscribe( data => {
          this.router.navigate(['management/dashboard']);
        },
        error => alert('Product could not be updated!') );
  }

  private populateProductFromForm(): Product {
    const product = new Product();
    product.name = this.addProductForm.value.name;
    product.seller = this.addProductForm.value.seller;
    product.description = this.addProductForm.value.description;
    product.price = this.addProductForm.value.price;
    product.enabled = this.addProductForm.value.enabled;

    return product;
  }
}
