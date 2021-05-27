import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {URL_ENDPOINTS} from '../constants/constants';
import {User} from '../models/User';
import {Product} from '../models/Product';
import {UserAuthenticationService} from './user-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  authenticatedUser: User | null;

  constructor(private http: HttpClient, private userAuthenticationService: UserAuthenticationService) {
    this.userAuthenticationService.sharedAuthenticatedUser.subscribe(authenticatedUser => this.authenticatedUser = authenticatedUser);
    this.authenticatedUser = null;
  }

  public login(user: User): Observable<any> {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(user.username + ':' + user.password)});
    return this.http.get(environment.rooturl + URL_ENDPOINTS.LOGIN_API_URL, {headers, responseType: 'json'});
  }

  public addUser(user: User): Observable<any> {
    const body = {
      username: user.username, password: user.password
    };
    return this.http.post(environment.rooturl + URL_ENDPOINTS.POST_USER_URL, body, {responseType: 'json'});
  }

  public getProducts(): Observable<any> {
    return this.http.get(environment.rooturl + URL_ENDPOINTS.GET_MEDICINES_URL, {responseType: 'json'});
  }

  public addProduct(product: Product): Observable<any> {
    const headers = this.getHeaders();
    const body = {
      name: product.name, seller: product.seller, description: product.description, price: product.price, enabled: product.enabled
    };
    return this.http.post(environment.rooturl + URL_ENDPOINTS.POST_MEDICINE_URL, body, {headers, responseType: 'json'});
  }

  public deleteProduct(productId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(environment.rooturl + URL_ENDPOINTS.DELETE_MEDICINE_URL + '/' + productId, {headers, responseType: 'json'});
  }

  public updateProduct(product: Product): Observable<any> {
    const headers = this.getHeaders();
    const body = {
      name: product.name, seller: product.seller, description: product.description, price: product.price, enabled: product.enabled
    };
    return this.http.put(environment.rooturl + URL_ENDPOINTS.UPDATE_MEDICINE_URL + '/' + product.id, body, {headers, responseType: 'json'});
  }

  public getOrders(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(environment.rooturl + URL_ENDPOINTS.GET_ORDERS_URL + '/' + this.authenticatedUser?.username,
      {headers, responseType: 'json'});
  }

  public addOrder(order: any): Observable<any> {
    const headers = this.getHeaders();
    const body = {
      products: [...order], username: this.authenticatedUser?.username
    };
    return this.http.post(environment.rooturl + URL_ENDPOINTS.POST_ORDER_URL, body, {headers, responseType: 'json'});
  }

  private getHeaders(): any {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.authenticatedUser?.username + ':' + this.authenticatedUser?.password)
    });
    return headers;
  }
}
