import {Component, Input, OnInit} from '@angular/core';

import {Product} from '../../../models/Product';
import {User} from '../../../models/User';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product | undefined;
  @Input() authenticatedUser: User | any;

  constructor() { }

  ngOnInit(): void {
  }
}
