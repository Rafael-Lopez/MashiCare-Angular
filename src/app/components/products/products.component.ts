import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/User';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() products: any | undefined;
  @Input() authenticatedUser: User | any;

  constructor() {
    this.authenticatedUser = null;
  }

  ngOnInit(): void {
  }

}
