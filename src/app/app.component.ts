import { Component, OnInit } from '@angular/core';
import { DataUserService } from './services/data-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dataUserService: DataUserService, private router: Router) {
    // if(!window.localStorage.getItem('TUL')){
    //   this.router.navigate(['/register'])
    // }else{
    //   this.router.navigate(['/home'])
    // }
  }
  ngOnInit() {
  }
}
