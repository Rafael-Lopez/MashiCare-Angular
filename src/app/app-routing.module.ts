import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/management/dashboard/dashboard.component';
import {EditProductComponent} from './components/management/dashboard/edit-product/edit-product.component';
import {ShopComponent} from './components/shop/shop.component';
import {CartComponent} from './components/shop/cart/cart.component';
import {CheckoutComponent} from './components/shop/checkout/checkout.component';
import {OrderHistoryComponent} from './components/shop/order-history/order-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: 'shop', component: ShopComponent },
  { path: 'management/login', component: LoginComponent },
  { path: 'management/dashboard', component: DashboardComponent },
  { path: 'management/dashboard/edit-product', component: EditProductComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/login/:redirect', component: LoginComponent },
  { path: 'user/cart', component: CartComponent },
  { path: 'user/checkout', component: CheckoutComponent },
  { path: 'user/order-history', component: OrderHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
