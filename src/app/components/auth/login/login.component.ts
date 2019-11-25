import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LanguagesService } from 'src/app/services/languages.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { DataUserService } from 'src/app/services/data-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loader = false;
  wordsCantent;
  massageForUser;
  authField = false;
  constructor(
    private languagesService: LanguagesService,
    private loginService: LoginService,
    private router: Router,
    private dataUserService: DataUserService) {
    if (window.localStorage.getItem('TUL')) {
      this.router.navigate(['/']);
    }
    this.wordsCantent = this.languagesService.returnContectLanguage();
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userNameOrEmailLogin: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onLoginForm() {
    this.authField = false;
    this.massageForUser = '';
    this.loader = true;
    if (this.loginForm.get('password').value == null) {
      this.authField = true;
      this.loader = false;
      this.massageForUser = this.wordsCantent.errorsServer[1];
      return;
    } else if (this.loginForm.get('password').value.length < 5) {
      this.authField = true;
      this.loader = false;
      this.massageForUser = this.wordsCantent.errorsServer[1];
      return;
    } else {
      this.loginService.UserLogin(this.loginForm.value).subscribe(result => {
        if (result.error) {
          this.authField = true;
          this.loader = false;
          this.massageForUser = this.wordsCantent.errorsServer[result.error];
          result
        } else {
          console.log(result);
          this.dataUserService.setUserId(result.Uid);
          this.dataUserService.setUserToken(result.token);
          this.router.navigate(['/']);
        }

      }, err => {
        this.authField = true;
        this.loader = false;
        this.massageForUser = this.wordsCantent.errorsServer[err.error];
      });
    }
  }

}
