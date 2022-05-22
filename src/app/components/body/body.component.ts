import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/events/evento.service';
// import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  listEvents: any = [];
  numEventosRecientes: number;
  colMap: any;
  colFilter: any;

  constructor(
    private eventoService: EventoService,
    // private usuario: AuthService
  ) {
    this.numEventosRecientes = 0;
  }

  ngOnInit(): void {
    this.cargarEventos();
    // if (this.usuario.getUser) {
    //   this.colMap = 'col-9';
    //   this.colFilter = 'col-3';
    // } else {
    //   this.colMap = 'col-10';
    //   this.colFilter = 'col-2';
    // }
  }

  // Eventos recientes
  cargarEventos() {
    this.eventoService.listEvents().subscribe((eventos) => {
      this.listEvents = eventos;
      this.numEventosRecientes = this.listEvents.length;
      // console.log(this.numEventosRecientes);
    });
  }
}
