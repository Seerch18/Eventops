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
import { CiudadService } from '../../../services/ciudad/ciudad.service';
import { FiltrosService } from '../../../services/filtros/filtros.service';
import { EtiquetaService } from '../../../services/etiquetas/etiqueta.service';

@Component({
  selector: 'app-menu-busqueda',
  templateUrl: './menu-busqueda.component.html',
  styleUrls: ['./menu-busqueda.component.css'],
})
export class MenuBusquedaComponent implements OnInit {
  public frmFiltro: FormGroup;
  public cities: Array<any>;
  public tags: Array<any>;
  @Output() eventos = new EventEmitter<any>();

  constructor(
    private frmBuilder: FormBuilder,
    private _router: Router,
    private params: ActivatedRoute,
    private ciudadService: CiudadService,
    private filtroService: FiltrosService,
    private etiquetaService: EtiquetaService
  ) {
    this.cities = [];
    this.tags = [];
    this.frmFiltro = this.frmBuilder.group({
      ciudad: new FormControl(''),
      etiquetas: new FormControl(''),
      fechaInicio: new FormControl(''),
      fechaFin: new FormControl(''),
      horaInicio: new FormControl(''),
      horaFin: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getCities();
    this.getTags();
  }

  filtrarEventos() {
    // console.log(this.frmFiltro.value);
    this.filtroService
      .getFilteredEvents(this.frmFiltro.value)
      .subscribe((resp) => {
        console.log(resp);
        this.eventos.emit(resp);
      });
  }

  getCities() {
    this.ciudadService.readCity().subscribe((resp) => {
      if (resp) {
        this.cities = resp;
      }
    });
  }

  getTags() {
    this.etiquetaService.readTags().subscribe((resp) => {
      if (resp) {
        this.tags = resp;
      }
    });
  }
}
