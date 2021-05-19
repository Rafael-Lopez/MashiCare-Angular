import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {UserAuthenticationService} from '../../services/user-authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  authenticatedUser: User | null;

  constructor(private userAuthenticationService: UserAuthenticationService, private router: Router) {
    this.authenticatedUser = null;
  }

  ngOnInit(): void {
    this.userAuthenticationService.sharedAuthenticatedUser.subscribe(
      authenticatedUser => this.authenticatedUser = authenticatedUser);
  }

  logout(): void {
    this.userAuthenticationService.nextAuthenticatedUser(null);
    this.redirect('shop');
  }

  redirect(path: string): void {
    this.router.navigate([path]);
  }
}
