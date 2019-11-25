import { Component, OnInit } from '@angular/core';
import { LanguagesService } from 'src/app/services/languages.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';
import { DataUserService } from 'src/app/services/data-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loader = false;
  registerForm: FormGroup;
  addImageForm: FormGroup;
  imagePreview;
  checkingEmail = '';
  checkingUserName = '';
  wordsCantent;
  massageForUser;
  authField = false;
  userAddImage = false;
  imageValid = false;
  loaderImage = false;
  errorImageMassage = false;

  constructor(
    private languagesService: LanguagesService,
    private registerService: RegisterService,
    private router: Router,
    private dataUserService: DataUserService) {
    if (window.localStorage.getItem('TUL')) {
      this.router.navigate(['/']);
    }
    this.wordsCantent = this.languagesService.returnContectLanguage();
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      userEmail: new FormControl(null, [Validators.required, Validators.email]),
      userFullName: new FormControl(null),
      userName: new FormControl(null, [Validators.required
        // ,this.forbiddenNames.bind(this)
      ]),
      password: new FormControl(null, [Validators.required])
    });
    this.addImageForm = new FormGroup({
      imageUser: new FormControl(null)
    })



    this.registerForm.valueChanges.subscribe(
      (value) => {
        if (value.userEmail !== this.checkingEmail && value.userEmail !== null && value.userEmail !== "") {
          this.authField = false;
          this.massageForUser = '';
          this.checkingEmail = value.userEmail;
          this.registerService.checkEmailUnique(value.userEmail).subscribe(result => {
            if (result.error) {
              this.massageForUser = this.wordsCantent.errorsServer[result.error];
              this.authField = true;
            }
          });
        }
        if (value.userName !== this.checkingUserName && value.userName !== null && value.userName !== "") {
          this.authField = false;
          this.massageForUser = '';
          this.checkingUserName = value.userName;
          this.registerService.checkUserNameUnique(value.userName).subscribe(result => {
            if (result.error) {
              this.massageForUser = this.wordsCantent.errorsServer[result.error];
              this.authField = true;
            }
          });
        }
      }
    );
  }



  onNextregisterForm() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.authField = false;
    this.loader = true;
    if (!this.registerForm.get('userEmail').value
      || !this.registerForm.get('userName').value
      || this.registerForm.get('password').value.length < 5
      || !re.test(String(this.registerForm.get('userEmail').value).toLowerCase())) {
      if (!re.test(String(this.registerForm.get('userEmail').value).toLowerCase())) {
        this.loader = false;
        this.authField = true;
        this.massageForUser = this.wordsCantent.ContentLoginRegister.RequiredFieldEmail;
        return;
      }
      if (this.registerForm.get('password').value.length < 5) {
        this.loader = false;
        this.authField = true;
        this.massageForUser = this.wordsCantent.errorsServer[1];
        return;
      }
    } else {
      this.registerService.createUserRegister(this.registerForm.value).subscribe(result => {
        if (result.error) {
          this.loader = false;
          this.authField = true;
          this.massageForUser = this.wordsCantent.errorsServer[result.error];
        } else {
          this.dataUserService.setUserToken(result.result.token);
          this.dataUserService.setUserId(result.result.uid);
          this.userAddImage = true;
        }
      }, err => {
        this.loader = false;
        this.authField = true;
        this.massageForUser = this.wordsCantent.errorsServer[4];
        return;
      });
    }
  }



  onImagePicked(event: Event) {
    this.errorImageMassage = false;
    const file = (event.target as HTMLInputElement).files[0];
    this.addImageForm.patchValue({ imageUser: file });
    this.addImageForm.get('imageUser').updateValueAndValidity();
    if (this.addImageForm.get('imageUser').value.type.substring(0, 5) === 'image') {
      this.imageValid = true;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  onAddImageForm() {
    this.loaderImage = true;
    this.registerService.addImageUser(this.addImageForm.value.imageUser).subscribe(res => {
      this.loaderImage = false;
      this.router.navigate(['/People']);
    }, err => {
      this.loaderImage = false;
      this.errorImageMassage = true;
      this.imagePreview = null;
    });
  }
  SkipImage() {
    this.router.navigate(['/People']);
  }
}
