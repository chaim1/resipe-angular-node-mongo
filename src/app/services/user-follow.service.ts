import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataUserService } from './data-user.service';

@Injectable({
  providedIn: 'root'
})
export class UserFollowService {

  constructor(private httpClient: HttpClient, private dataUserService: DataUserService) { }
  returnAllUsersForFollow(skipAndLimit): any {
    return this.httpClient.post(environment.uri + 'user/usersFolwo' + this.dataUserService.getUserId(), skipAndLimit);
  }
  onFollowing(userData) {
    return this.httpClient.post(environment.uri + 'user/addUserFollow', userData);
  }
  onUnFollowing(userData) {
    return this.httpClient.post(environment.uri + 'user/pullUserFollow', userData);
  }
  setFollowInUserFollow(userData) {
    return this.httpClient.post(environment.uri + 'user/addUserFollowInUserFollow', userData);
  }
  pullFollowInUserFollow(userData) {
    return this.httpClient.post(environment.uri + 'user/pullUserFollowInUserFollow', userData);
  }
}

