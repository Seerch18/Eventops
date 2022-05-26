import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css'],
})
export class ListarEventosComponent implements OnInit {
  public eventos: Array<any>;

  constructor(private adminService: AdminService) {
    this.eventos = [];
  }

  ngOnInit(): void {
    this.listAllEvents();
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
