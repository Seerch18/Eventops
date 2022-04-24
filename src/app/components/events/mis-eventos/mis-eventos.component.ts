import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../services/events/evento.service';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css'],
})
export class MisEventosComponent implements OnInit {
  listEvents: Array<Event>;

  constructor(private eventoService: EventoService) {
    this.listEvents = [];
  }

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventoService
      .listEvents()
      .subscribe((eventos) => (this.listEvents = eventos));
  }
}
