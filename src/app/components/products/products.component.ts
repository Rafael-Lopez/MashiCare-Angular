import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/User';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() products: any | undefined;
  user: User | null;

  constructor() {
    const userDetailsStr = window.sessionStorage.getItem('userDetails');
    if (userDetailsStr !== null) {
      this.user = (JSON.parse(userDetailsStr || '{}'));
    } else {
      this.user = null;
    }
  }

  ngOnInit(): void {
  }

}
