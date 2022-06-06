import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../services/events/evento.service';
import { Evento } from '../../../models/Evento';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css'],
})
export class MisEventosComponent implements OnInit {
  listEvents: Array<Evento>;

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

  eliminarEvento(id: any) {
    this.eventoService.deleteEvent(id).subscribe((resp) => {
      if (!resp['delete']) {
        alert('Error al eliminar el registro');
      }
      this.cargarEventos();
    });
  }
}
