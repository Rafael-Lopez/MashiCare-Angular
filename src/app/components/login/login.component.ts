import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {RestApiService} from '../../services/rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserAuthenticationService} from '../../services/user-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string | undefined;
  password: string | undefined;
  redirect = null;

  constructor(private userAuthenticationService: UserAuthenticationService,
              private restApiService: RestApiService, private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.redirect = this.activatedRoute.snapshot.paramMap.get('redirect');
  }

  ngOnInit(): void {
  }

  validateUser(): void {
    const user = new User(this.username, this.password);
    let isAdmin = false;

    this.restApiService.login(user).subscribe(
      responseData => {
        const authenticatedUser = new User(user.username, user.password);
        authenticatedUser.authenticated = responseData.authenticated;
        const authorities = new Array<string>();

        responseData.authorities.forEach( (authorityObject: any) => {
          authorities.push(authorityObject.authority);
          if (authorityObject.authority === 'ROLE_ADMIN') {
            isAdmin = true;
          }
        });

        authenticatedUser.authorities = authorities;

        this.userAuthenticationService.nextAuthenticatedUser(authenticatedUser);

        if (isAdmin) {
          this.router.navigate(['management/dashboard']);
        } else {
          if (this.redirect) {
            this.router.navigate(['user/checkout']);
          } else {
            this.router.navigate(['shop']);
          }
        }
      }, error => {
        console.log(error);
      });

  }

}
