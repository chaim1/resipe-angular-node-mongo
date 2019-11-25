import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }



  UserLogin(userData): any {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(userData.userNameOrEmailLogin).toLowerCase())) {
      return this.httpClient.post(environment.uri + 'user/loginByUserName', userData);
    } else {
      return this.httpClient.post(environment.uri + 'user/loginByEmail', userData);
    }


  }

}
