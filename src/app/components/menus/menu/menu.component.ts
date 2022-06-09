import { Component, OnInit, Input } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  private user: any;
  public isAdmin: boolean;

  constructor() {
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.getLSUser();
    if (this.user) {
      if (this.user.rol == 'ADMIN') {
        this.isAdmin = true;
      }
    }
  }

  getLSUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
  }
}
