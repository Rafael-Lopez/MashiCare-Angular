import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/management/dashboard/dashboard.component';
import { ProductComponent } from './components/products/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { EditProductComponent } from './components/management/dashboard/edit-product/edit-product.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShopComponent } from './components/shop/shop.component';
import { SearchComponent } from './components/shop/search/search.component';
import { CartComponent } from './components/shop/cart/cart.component';
import { CheckoutComponent } from './components/shop/checkout/checkout.component';
import { OrderHistoryComponent } from './components/shop/order-history/order-history.component';
import { ConfirmationComponent } from './components/shop/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductComponent,
    ProductsComponent,
    EditProductComponent,
    NavbarComponent,
    ShopComponent,
    SearchComponent,
    CartComponent,
    CheckoutComponent,
    OrderHistoryComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
