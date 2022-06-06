import { NgLocaleLocalization } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public isAuth: boolean;
  public menu_col: string = 'col-2';
  public body_col: string = 'col-12';

  constructor() {
    this.isAuth = false;
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.isAuth = true;
      this.body_col = 'col-10';
    }
  }
}
