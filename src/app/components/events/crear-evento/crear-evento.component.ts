import { Component, Input, OnInit } from '@angular/core';
import { EventoService } from '../../../services/events/evento.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css'],
})
export class CrearEventoComponent implements OnInit {
  public frmEvento: FormGroup;
  public aEventos: Array<Event>;
  public currentPosition: any;

  constructor(
    private frmBuilder: FormBuilder,
    private eventoService: EventoService
  ) {
    this.aEventos = [];
    this.frmEvento = this.frmBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      dateStart: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required),
      ubi: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      participants: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    console.log(history.state);
    this.currentPosition = history.state;
    this.frmEvento.controls['ubi'].setValue(
      'Lat: ' + history.state.lat + ' ' + 'Lng' + history.state.lng
    );
  }

  crearEvento() {
    console.log(this.frmEvento.value);
    this.eventoService
      .saveEvent(this.frmEvento.value)
      .subscribe((resp: any) => {
        console.log(resp);
      });
  }
}
