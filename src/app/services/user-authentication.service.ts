import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  private authenticatedUser = new BehaviorSubject(null);
  sharedAuthenticatedUser = this.authenticatedUser.asObservable();

  constructor() { }

  nextAuthenticatedUser(authenticatedUser: any): void {
    this.authenticatedUser.next(authenticatedUser);
  }
}
