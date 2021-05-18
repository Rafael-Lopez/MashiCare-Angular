import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AppConstants} from '../constants/constants';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<any> {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(user.username + ':' + user.password)});
    return this.http.get(environment.rooturl + AppConstants.LOGIN_API_URL, {headers, responseType: 'json'});
  }

  public getProducts(): Observable<any> {
    return this.http.get(environment.rooturl + AppConstants.GET_MEDICINES_URL, {responseType: 'json'});
  }
}
