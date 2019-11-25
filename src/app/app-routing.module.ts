import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PeopleComponent } from './components/Follow/people/people.component';
import { SearchForMobileComponent } from './components/search-for-mobile/search-for-mobile.component';
import { HomeComponent } from './components/home/home/home.component';
import { AddRecipeComponent } from './components/user/add-recipe/add-recipe.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'People', component: PeopleComponent },
  {path: 'search', component: SearchForMobileComponent},
  {path: 'home', component: HomeComponent, children: [
  ]},
  {path: 'addRecipe', component: AddRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
