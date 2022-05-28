import { Component, OnInit } from '@angular/core';

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
        console.log('pasa');
        this.isAdmin = true;
      }
    }
  }

  getLSUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      console.log(this.user);
    }
  }
}
