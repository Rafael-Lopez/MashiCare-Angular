import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {URL_ENDPOINTS} from '../constants/constants';
import {User} from '../models/User';
import {Product} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<any> {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(user.username + ':' + user.password)});
    return this.http.get(environment.rooturl + URL_ENDPOINTS.LOGIN_API_URL, {headers, responseType: 'json'});
  }

  public getProducts(): Observable<any> {
    return this.http.get(environment.rooturl + URL_ENDPOINTS.GET_MEDICINES_URL, {responseType: 'json'});
  }

  public addProduct(product: Product): Observable<any> {
    const userDetailsStr = window.sessionStorage.getItem('userDetails');
    const userDetails = JSON.parse(userDetailsStr || '{}');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(userDetails.username + ':' + userDetails.password)
    });
    const body = { name: product.name, seller: product.seller, description: product.description, price: product.price };
    return this.http.post(environment.rooturl + URL_ENDPOINTS.POST_MEDICINE_URL, body, {headers, responseType: 'json'});
  }
}
