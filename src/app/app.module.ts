import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng2ImgMaxModule } from 'ng2-img-max';
// import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HeaderAuthComponent } from './components/auth/header-auth/header-auth.component';
import { FooterAuthComponent } from './components/auth/footer-auth/footer-auth.component';
import { LoaderComponent } from './components/helpers/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeopleComponent } from './components/Follow/people/people.component';
import { HeaderComponent } from './components/home/header/header.component';
import { HomeComponent } from './components/home/home/home.component';
import { SearchForMobileComponent } from './components/search-for-mobile/search-for-mobile.component';
import { AddRecipeComponent } from './components/user/add-recipe/add-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderAuthComponent,
    FooterAuthComponent,
    LoaderComponent,
    PeopleComponent,
    HeaderComponent,
    HomeComponent,
    SearchForMobileComponent,
    AddRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2ImgMaxModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
