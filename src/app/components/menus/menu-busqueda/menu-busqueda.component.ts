import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { EventoService } from '../../../services/events/evento.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Evento } from '../../../models/Evento'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { CiudadService } from '../../../services/ciudad/ciudad.service'
import { FiltrosService } from '../../../services/filtros/filtros.service'
import { EtiquetaService } from '../../../services/etiquetas/etiqueta.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-menu-busqueda',
  templateUrl: './menu-busqueda.component.html',
  styleUrls: ['./menu-busqueda.component.css']
})
export class MenuBusquedaComponent implements OnInit {
  public frmFiltro: FormGroup
  public cities: Array<any>
  public tags: Array<any>
  @Output() eventos = new EventEmitter<any>()
  durationInSeconds = 3

  constructor(
    private frmBuilder: FormBuilder,
    private _router: Router,
    private params: ActivatedRoute,
    private ciudadService: CiudadService,
    private filtroService: FiltrosService,
    private etiquetaService: EtiquetaService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.cities = []
    this.tags = []
    this.frmFiltro = this.frmBuilder.group({
      ciudad: new FormControl(''),
      etiquetas: new FormControl(''),
      fechaInicio: new FormControl(''),
      fechaFin: new FormControl(''),
      horaInicio: new FormControl(''),
      horaFin: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.getCities()
    this.getTags()
  }

  filtrarEventos() {
    this.filtroService
      .getFilteredEvents(this.frmFiltro.value)
      .subscribe((resp) => {
        if (resp) {
          this.openSnackBar('Se han encontrado eventos')
        } else {
          this.openSnackBar('No se ha encontrado ningún evento')
        }
        this.eventos.emit(resp)
      })
  }

  getCities() {
    this.ciudadService.readCity().subscribe((resp) => {
      if (resp) {
        this.cities = resp
      }
    })
  }

  getTags() {
    this.etiquetaService.readTags().subscribe((resp) => {
      if (resp) {
        this.tags = resp
      }
    })
  }

  /**
   * Muestra una alerta con el mensaje recibido por parámetro
   * @param message
   */
  openSnackBar(message: any) {
    this._snackBar.open(message, 'UNDO', {
      duration: this.durationInSeconds * 1000
    })
  }
}
