import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from '../../dialog/about/about.component';

@Component({
  selector: 'app-menu-info',
  templateUrl: './menu-info.component.html',
  styleUrls: ['./menu-info.component.css'],
})
export class MenuInfoComponent implements OnInit {
  private user: any;
  public name: any;
  public isAuth: boolean;

  constructor(public _router: Router, public dialog: MatDialog) {
    this.isAuth = false;
  }
  ngOnInit(): void {
    this.getLSUser();
    if (this.user) {
      this.isAuth = true;
      this.name = this.user.nombre;
    }
  }

  /**
   * Carga el usuario de la sesión
   */
  getLSUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
  }

  openDialog() {
    this.dialog.open(AboutComponent, {
      width: '500',
      height: '400',
    });
  }
}
