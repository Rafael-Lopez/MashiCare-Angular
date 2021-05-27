import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/User';
import {RestApiService} from '../../../services/rest-api.service';
import {UserAuthenticationService} from '../../../services/user-authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  username: string | undefined;
  password: string | undefined;

  constructor(private restApiService: RestApiService, private router: Router,
              private userAuthenticationService: UserAuthenticationService) {
  }

  ngOnInit(): void {
  }

  signUp(): void {
    const user = new User(this.username, this.password);

    this.restApiService.addUser(user).subscribe( response => {
      this.restApiService.login(user).subscribe(
        responseData => {
          const authenticatedUser = new User(user.username, user.password);
          authenticatedUser.authenticated = responseData.authenticated;
          const authorities = new Array<string>();

          responseData.authorities.forEach((authorityObject: any) => {
            authorities.push(authorityObject.authority);
          });

          authenticatedUser.authorities = authorities;

          this.userAuthenticationService.nextAuthenticatedUser(authenticatedUser);
          this.router.navigate(['shop']);

        }, error => {
          console.log(error);
        });
    }, error => {
      console.log(error);
    });
  }
}
