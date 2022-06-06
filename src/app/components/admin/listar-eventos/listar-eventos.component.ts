import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css'],
})
export class ListarEventosComponent implements OnInit {
  public eventos: Array<any>;

  constructor(private adminService: AdminService, private _router: Router) {
    this.eventos = [];
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      if (JSON.parse(localStorage.getItem('user')!).rol == 'ADMIN') {
        this.listAllEvents();
      } else {
        this._router.navigateByUrl('/');
      }
    }
  }

  listAllEvents() {
    this.adminService.listAllEvents().subscribe((resp) => {
      if (resp) {
        console.log(this.eventos);
        this.eventos = resp;
      }
    });
  }
}
