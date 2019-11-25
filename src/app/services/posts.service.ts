import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { DataUserService } from './data-user.service';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  ImagePost: File;
  constructor(private httpClient: HttpClient, private dataUserServise: DataUserService) { }

  saveImage(image: File) {
    this.ImagePost = image;
  }
  getImageForView() {
    return this.ImagePost;
  }
  createPost(title, Instructions, image: File): any {
    const idUser = this.dataUserServise.getUserId();
    const dataPost = new FormData();
    dataPost.append('title', title);
    dataPost.append('Instructions', Instructions);
    dataPost.append('image', image);
    dataPost.append('userId', idUser);
    return this.httpClient.post(environment.uri + 'post/createPost', dataPost);
  }
  setIngredient(ingedient, idPost) {
    return this.httpClient.post(environment.uri + 'post/insertIngredient' + idPost, {ingedient});
  }

  getPostUserFollow() {
    return this.httpClient.get(environment.uri + 'post/allPostsFollowUser' + this.dataUserServise.getUserId());
  }
  userLikePost(idPost) {
    const idUser = this.dataUserServise.getUserId();
    return this.httpClient.post(environment.uri + 'post/likePost' + idPost, {idUser});
  }
  userDontLikePost(idPost) {
    const idUser = this.dataUserServise.getUserId();
    return this.httpClient.post(environment.uri + 'post/dontLikePost' + idPost, {idUser});
  }
}
