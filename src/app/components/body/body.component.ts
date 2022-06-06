import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/events/evento.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  public filteredEvents: Array<any>;
  public markers: Array<any>;

  constructor() {
    this.filteredEvents = [];
    this.markers = [];
  }

  ngOnInit(): void {}

  mostrarEventosFiltrados(eventos: any) {
    if (eventos) {
      this.filteredEvents = eventos;
    } else {
      this.filteredEvents = [];
    }
    this.markers = [];
    if (this.filteredEvents.length != 0) {
      this.markers = this.filteredEvents;
      console.log(this.markers);
    }
  }
}
