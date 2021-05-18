import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../../../services/rest-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: any;
  constructor(private restApiService: RestApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts = () => {
    this.restApiService.getProducts()
      .subscribe(data => this.products = data);
  }

}
