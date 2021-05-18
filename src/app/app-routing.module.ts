import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/management/dashboard/dashboard.component';
import {AddProductComponent} from './components/management/dashboard/add-product/add-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'management/login', pathMatch: 'full' },
  { path: 'management/login', component: LoginComponent },
  { path: 'management/dashboard', component: DashboardComponent },
  { path: 'management/dashboard/new-product', component: AddProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
