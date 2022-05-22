import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EventoService } from '../../../services/events/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../../../models/Evento';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { CiudadService } from '../../../services/ciudad/ciudad.service';
import { FiltrosService } from '../../../services/filtros/filtros.service';

@Component({
  selector: 'app-menu-busqueda',
  templateUrl: './menu-busqueda.component.html',
  styleUrls: ['./menu-busqueda.component.css'],
})
export class MenuBusquedaComponent implements OnInit {
  public frmFiltro: FormGroup;
  public cities: Array<any>;
  @Output() eventos = new EventEmitter<any>();

  constructor(
    private frmBuilder: FormBuilder,
    private _router: Router,
    private params: ActivatedRoute,
    private auth: AuthService,
    private ciudad: CiudadService,
    private filtros: FiltrosService
  ) {
    this.cities = [];
    this.frmFiltro = this.frmBuilder.group({
      ciudad: new FormControl(''),
      etiqueta: new FormControl(''),
      fechaInicio: new FormControl(''),
      fechaFin: new FormControl(''),
      horaInicio: new FormControl(''),
      horaFin: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getCities();
  }

  filtrarEventos() {
    console.log(this.frmFiltro.value);
    this.filtros.getFilteredEvents(this.frmFiltro.value).subscribe((resp) => {
      if (resp) {
        this.eventos.emit(resp);
      }
    });
  }

  getCities() {
    this.ciudad.readCity().subscribe((resp) => {
      if (resp) {
        this.cities = resp;
      }
    });
  }
}
