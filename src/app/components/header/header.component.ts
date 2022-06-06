import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isAuth: boolean;
  public avatar: string;
  constructor() {
    this.isAuth = false;
    this.avatar = '../../../assets/IMG/avatar.jpg';
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.isAuth = true;
      let user = JSON.parse(localStorage.getItem('user')!);
      if (user.avatar) {
        this.avatar = user.avatar;
      }
    }
  }
}
