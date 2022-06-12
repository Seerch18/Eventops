import { Component, OnInit } from '@angular/core'
import { EventoService } from '../../../services/events/evento.service'

@Component({
  selector: 'app-participando-eventos',
  templateUrl: './participando-eventos.component.html',
  styleUrls: ['./participando-eventos.component.css']
})
export class ParticipandoEventosComponent implements OnInit {
  public eventos: Array<any>

  constructor(private eventoService: EventoService) {
    this.eventos = []
  }

  ngOnInit(): void {
    this.cargarEventos()
  }

  cargarEventos() {
    this.eventoService.readParticipacionesEvento(0, true).subscribe((resp) => {
      if (resp) {
        console.log(resp)
        this.eventos = resp
      }
    })
  }
}
