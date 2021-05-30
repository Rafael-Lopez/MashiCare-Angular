import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import {Product} from '../../models/Product';
import {By} from '@angular/platform-browser';
import {Component, Input} from '@angular/core';
import {User} from '../../models/User';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, MockProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display alert if no products', () => {
    const alert = fixture.debugElement.query(By.css('#no-products-alert'));
    expect(alert).toHaveSize(1);
  });

  it('should display "No products found" message', () => {
    const alert = fixture.debugElement.query(By.css('#no-products-alert'));
    expect(alert.nativeElement.textContent.trim()).toBe('No products found');
  });

  it('should display 2 products', () => {
    const productA = new Product();
    productA.id = 1;
    productA.name = 'Product 1';
    productA.enabled = true;
    productA.description = 'Some product 1';
    productA.price = 5;
    productA.seller = 'Seller 1';
    const productB = new Product();
    productB.id = 1;
    productB.name = 'Product 1';
    productB.enabled = true;
    productB.description = 'Some product 1';
    productB.price = 10;
    productB.seller = 'Seller 2';

    component.products = [productA, productB];

    fixture.detectChanges();

    const productNodes = fixture.debugElement.queryAllNodes(By.css('app-product'));

    expect(component.products).toHaveSize(2);
    expect(productNodes.length).toBe(2);
  });
});

// Mock ProductComponent
@Component({
  selector: 'app-product',
  template: ''
})
class MockProductComponent {
  @Input() product: Product | undefined;
  @Input() authenticatedUser: User | any;
}
