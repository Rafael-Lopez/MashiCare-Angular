import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RestApiService} from '../../../services/rest-api.service';
import {faPrescriptionBottleAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: any | undefined;

  constructor(private router: Router, private restApiService: RestApiService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders = () => {
    this.restApiService.getOrders()
      .subscribe(data => {
        this.orders = [];

        data.forEach((order: any) => {
          this.orders.push(order);
        });
      });
  }

  redirect(path: string): void {
    this.router.navigate([path]);
  }
}
