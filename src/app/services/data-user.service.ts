import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataUserService {
  UserToken;
  UserId;
  constructor(private httpClient: HttpClient) { }
  getUserToken() {
    if (this.UserToken) {
      return this.UserToken;
    } else {
      return window.localStorage.getItem('TUL');
    }
  }
  setUserToken(Token) {
    this.UserToken = Token;
    window.localStorage.setItem('TUL', Token);
  }


  getUserId() {
    if (this.UserId) {
      return this.UserId;
    } else {
      return window.localStorage.getItem('IUL');
    }
  }
  setUserId(Id) {
    this.UserId = Id;
    window.localStorage.setItem('IUL', Id);
  }



}
