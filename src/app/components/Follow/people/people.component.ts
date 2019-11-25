import { Component, OnInit } from '@angular/core';
import { UserFollowService } from 'src/app/services/user-follow.service';
import { DataUserService } from 'src/app/services/data-user.service';
import { LanguagesService } from 'src/app/services/languages.service';
import { VariousService } from 'src/app/services/various.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  peopleFollow;
  imageUserView = false;
  imageView;
  dataContent;
  colors;
  userId;
  loader = true;
  skip = 0;
  limit = 15;
  loadMoreResult = false;
  endResult = false;
  a;
  left;
  constructor(private userFollowService: UserFollowService, private dataUserService: DataUserService, private languagesService: LanguagesService, private variousServices: VariousService) {
    this.userId = this.dataUserService.getUserId()
    this.dataContent = this.languagesService.returnContectLanguage();
    this.colors = this.variousServices.returnColors();
    this.a = this.userFollowService.
      returnAllUsersForFollow({ skip: this.skip, limit: this.limit }).
      subscribe(result => {
        if (result.length > 0) {
          this.peopleFollow = result;
          console.log(result);
        }
        this.loader = false;
        this.skip += result.length;
      });
  }

  ngOnInit() {

    window.onscroll = () => {
      let d = document.body;
      let offset = d.scrollTop + window.innerHeight;
      let height = d.offsetHeight;
      if (offset >= height && !this.loadMoreResult && !this.endResult) {
        this.loadMoreResult = true;
        this.getUserForFollow(this.skip, this.limit);
      }
    };
  }


  getUserForFollow(skip, limit) {
    this.a = this.userFollowService.returnAllUsersForFollow({ skip: skip, limit: limit }).subscribe(result => {

      this.loadMoreResult = false;
      if (result.length < 10) {
        this.endResult = true;
      }
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          this.peopleFollow[this.skip] = result[i];
          this.skip += 1;
        }
      }
      this.loader = false;
    });
  }
  onClickImageUser(imageUser) {
    this.imageView = imageUser;
    this.imageUserView = true;
    setTimeout(() => {
      document.getElementById('imageGrow').classList.add("inageViewgrow");
    }, 1);
  }
  onFollowFerson(idUserFollow, id) {
    document.getElementById(id).classList.remove("display");
    document.getElementById(idUserFollow).classList.add("display");

    let data = {
      followId: idUserFollow,
      userId: this.userId
    }
    this.userFollowService.onFollowing(data).subscribe(result => {
      console.log(result);
    })
    this.userFollowService.setFollowInUserFollow(data).subscribe(res => {
      console.log(res);
    })
  }
  UnFollowFerson(idUserFollow, id) {
    document.getElementById(idUserFollow).classList.remove("display");
    document.getElementById(id).classList.add("display");
    let data = {
      followId: idUserFollow,
      userId: this.userId
    };
    this.userFollowService.pullFollowInUserFollow(data).subscribe(result => {
      console.log(result);
    });
    this.userFollowService.onUnFollowing(data).subscribe(result => {
      console.log(result);
    });
  }
  closeViewImage() {
    document.getElementById('imageGrow').classList.add("inageViewClose");
    setTimeout(() => {
      this.imageUserView = false;
    }, 100);
  }
  checkIfFollow(following) {
    return following.indexOf(this.userId) >= 0;
  }
  ngOnDestroy(): void {
    this.a.unsubscribe();
    this.userFollowService
    console.log(123);

  }
}

