import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../services/events/evento.service';
import { Evento } from '../../../models/Evento';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css'],
})
export class MisEventosComponent implements OnInit {
  listEvents: Array<Evento>;

  constructor(private eventoService: EventoService, public usuario:AuthService) {
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
