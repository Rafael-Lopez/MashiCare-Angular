import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {RestApiService} from '../../services/rest-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string | undefined;
  password: string | undefined;

  constructor(private restApiService: RestApiService, private router: Router) {
  }

  ngOnInit(): void {
  }

  validateUser(): void {
    const user = new User(this.username, this.password);
    this.restApiService.login(user).subscribe(
      responseData => {
        const authenticatedUser = new User(user.username, user.password);
        authenticatedUser.authenticated = responseData.authenticated;
        const authorities = new Array<string>();
        responseData.authorities.forEach( (authorityObject: any) => {
          authorities.push(authorityObject.authority);
        });
        authenticatedUser.authorities = authorities;
        window.sessionStorage.setItem('userDetails', JSON.stringify(authenticatedUser));
        this.router.navigate(['management/dashboard']);
      }, error => {
        console.log(error);
      });

  }

}
