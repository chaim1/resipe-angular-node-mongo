import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataUserService } from './data-user.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient, private dataUserService: DataUserService) { }







  createUserRegister(userData): any {
    return this.httpClient.post(environment.uri + 'user/register', userData);
  }

  checkEmailUnique(Email): any {
    return this.httpClient.get(environment.uri + 'user/userEmail' + Email);
  }

  checkUserNameUnique(userName): any {
    return this.httpClient.get(environment.uri + 'user/userName' + userName);
  }
  addImageUser(userImage: File): any {
    const userId = this.dataUserService.getUserId();
    const imageData = new FormData();
    imageData.append('image', userImage);
    imageData.append('userId', userId);
    return this.httpClient.post(environment.uri + 'user/userAddImage', imageData);
  }
}
