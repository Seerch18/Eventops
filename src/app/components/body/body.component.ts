import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/events/evento.service';
// import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  public filteredEvents: Array<any>;

  constructor() {
    this.filteredEvents = [];
  }

  ngOnInit(): void {}

  mostrarEventosFiltrados(eventos: any) {
    console.log(eventos);
    if (eventos) {
      this.filteredEvents = eventos;
    } else {
      this.filteredEvents = [];
    }
    console.log(this.filteredEvents.length);
  }
}
