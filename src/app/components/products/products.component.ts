import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {UserAuthenticationService} from '../../services/user-authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() products: any | undefined;
  authenticatedUser: User | null;

  constructor(private userAuthenticationService: UserAuthenticationService) {
    this.authenticatedUser = null;
  }

  ngOnInit(): void {
    this.userAuthenticationService.sharedAuthenticatedUser.subscribe(
      authenticatedUser => this.authenticatedUser = authenticatedUser);
  }

}
