import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/management/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'management/login', pathMatch: 'full' },
  { path: 'management/login', component: LoginComponent },
  { path: 'management/dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
