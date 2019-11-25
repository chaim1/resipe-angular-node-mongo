import { Component, OnInit } from '@angular/core';
import { DataUserService } from 'src/app/services/data-user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { LanguagesService } from 'src/app/services/languages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addImageForm: FormGroup;
  posts;
  loader = true;
  contentWords;
  UserId;
  userLike = false;
  constructor(
    private dataUserService: DataUserService,
    private route: Router,
    private postsService: PostsService,
    private languagesService: LanguagesService) {
    this.contentWords = this.languagesService.returnContectLanguage();
    this.postsService.getPostUserFollow().subscribe(result => {
      this.posts = result;
      console.log(result);
      this.loader = false;
    });
    this.UserId = this.dataUserService.getUserId();
  }

  ngOnInit() {
    document.getElementById('addPostMoblie').style.top = '' + (window.innerHeight - 40) + 'px';
    this.addImageForm = new FormGroup({
      imagePost: new FormControl(null)
    });
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addImageForm.patchValue({ imagePost: file });
    // console.log(this.addImageForm.value.imagePost);

    this.postsService.saveImage(this.addImageForm.value.imagePost);
    // console.log(this.addImageForm.value.imagePost);
    this.route.navigate(['addRecipe']);
  }
  onUserLikePost(postId, userLike) {
    document.getElementById(postId + 1).style.display = 'none';
    document.getElementById(postId).style.display = 'inline';

    this.postsService.userLikePost(postId).subscribe(res => {
      console.log(res);
    });
  }
  onUserPullLikePost(postId) {
    document.getElementById(postId).style.display = 'inline';
    document.getElementById(postId + 1).style.display = 'none';
    this.postsService.userDontLikePost(postId).subscribe(res => {
      console.log(res);
    });
  }
}
