import { Component, OnInit } from '@angular/core';
import { LanguagesService } from 'src/app/services/languages.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dataContent;
  constructor(private languagesService: LanguagesService) {
    this.dataContent = this.languagesService.returnContectLanguage();
  }

  ngOnInit() {
  }

}
