import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core'
import { EventoService } from '../../../services/events/evento.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Evento } from '../../../models/Evento'
import { AdminService } from '../../../services/admin/admin.service'
import { EtiquetaService } from '../../../services/etiquetas/etiqueta.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DeleteComponent } from '../../dialog/delete/delete.component'
import { DeleteEventoComponent } from '../../dialog/delete-evento/delete-evento.component'

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {
  public frmEvento: FormGroup
  public evento: Evento
  public currentPosition: any
  public newPosition: any
  private user: any
  public tagsList: Array<any> // array con todas las etiquetas
  public tags = new FormControl()
  public eventTags: Array<any>
  @Input() position = {
    lat: 37.88785365229443,
    lng: -4.779458242357073
  }
  durationInSeconds = 5
  public currentDate: any

  constructor(
    private frmBuilder: FormBuilder,
    private eventoService: EventoService,
    private _router: Router,
    private params: ActivatedRoute,
    private adminService: AdminService,
    private etiquetaService: EtiquetaService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.currentDate = new Date().toISOString().split('T')[0]
    this.evento = {} as Evento
    this.tagsList = []
    this.eventTags = []
    this.frmEvento = this.frmBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      description: new FormControl('', Validators.required),
      dateStart: new FormControl('', Validators.required),
      timeStart: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required),
      ubi: new FormControl('', Validators.required),
      price: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.getLSUser()
    this.getTags()
    let botonEvento = document.getElementById('botonEvento')
    let botonCancelarBorrar = document.getElementById('botonCancelarBorrar')
    if (this.params.snapshot.paramMap.get('id')) {
      let id = this.params.snapshot.paramMap.get('id')
      this.addDataFields(id)
      this.addTags(id)
      if (botonEvento) botonEvento.textContent = 'Actualizar Evento'
      if (botonCancelarBorrar) botonCancelarBorrar.textContent = 'Borrar Evento'
    } else {
      this.setPosition()
    }
  }

  /**
   * Carga el usuario de la sesión
   */
  getLSUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!)
    }
  }

  /**
   * Crear o editar evento
   */
  crearEditarEvento() {
    // editar
    if (this._router.url.includes('saveEvent/' + this.evento.id)) {
      console.log(this.frmEvento.value)
      if (this.user.rol == 'ADMIN') {
        this.adminService
          .editEvent(this.frmEvento.value, this.evento.id)
          .subscribe((resp) => {
            this.openSnackBar('Evento Actualizado')
          })
      } else {
        this.eventoService
          .editEvent(this.frmEvento.value, this.evento.id)
          .subscribe((resp: any) => {
            this.openSnackBar('Evento Actualizado')
          })
      }
    } else {
      // crear
      console.log(this.frmEvento.value)
      this.eventoService
        .saveEvent(this.frmEvento.value)
        .subscribe((resp: any) => {
          this.openSnackBar('Evento Creado')
        })
    }
  }

  /**
   * Función a la que se llama desde app-googlemaps y recibe la nueva localización
   * @param newPosition
   */
  addPosition(newPosition: any) {
    this.newPosition = newPosition
    this.datosCampoUbicacion(this.newPosition.lat + ';' + this.newPosition.lng)
  }

  /**
   * Añade la ubicación en el campo del formulario
   */
  setPosition() {
    let lat = 0
    let lng = 0
    if (history.state.lat == undefined || history.state.lng == undefined) {
      lat = this.position.lat
      lng = this.position.lng
    } else {
      this.currentPosition = history.state
      lat = history.state.lat
      lng = history.state.lng
    }
    this.datosCampoUbicacion(lat + ';' + lng)
  }

  /**
   * Añadir datos a los campos del formulario
   * @param id
   */
  addDataFields(id: any) {
    if (this.user.rol == 'ADMIN') {
      this.adminService.getEvent(id).subscribe((evento) => {
        this.evento = evento
        let fechaInicio = this.evento.fechaInicio.split(' ')

        this.datosCampoUbicacion(this.evento.ubicacion)
        this.datosCamposFormulario(
          this.evento.nombre,
          this.evento.descripcion,
          fechaInicio[0],
          fechaInicio[1],
          this.evento.precio
        )
      })
    } else {
      this.eventoService.getEvent(id).subscribe((evento) => {
        console.log(evento)
        this.evento = evento
        let fechaInicio = this.evento.fechaInicio.split(' ')

        this.datosCampoUbicacion(this.evento.ubicacion)
        this.datosCamposFormulario(
          this.evento.nombre,
          this.evento.descripcion,
          fechaInicio[0],
          fechaInicio[1],
          this.evento.precio
        )
      })
    }
  }

  /**
   * Establece en el campo del formulario las etiquetas obtenidas de la llamada al servicio
   * @param id
   */
  addTags(id: any) {
    this.etiquetaService.readEventTag(id).subscribe((resp) => {
      if (resp) {
        this.eventTags = resp
        let tagsId: Array<any> = []
        resp.forEach((element: any) => {
          tagsId.push(element.id)
        })
        this.frmEvento.controls['tags'].setValue(tagsId)
      }
    })
  }

  /**
   * Elimina un evento y borra los datos de los campos del formulario
   */
  cancelarBorrarEvento() {
    let isAdmin = false
    if (this.user.rol == 'ADMIN') {
      isAdmin = true
    }
    let boton = document.getElementById('botonCancelarBorrar')
    if (boton) {
      if (boton.innerHTML == 'Borrar Evento') {
        // eliminar evento de la bbdd
        this.openDeleteDialog(isAdmin, { id: this.evento.id })
      } else {
        // vaciar todos los campos
        this.datosCamposFormulario('', '', '', '', '')
        this.frmEvento.controls['tags'].setValue('')
      }
    }
  }

  /**
   * Rellena los campos del formulario recibido por parámetro
   * @param nombre
   * @param descripcion
   * @param fechaIni
   * @param horaIni
   * @param precio
   */
  datosCamposFormulario(
    nombre: any,
    descripcion: any,
    fechaIni: any,
    horaIni: any,
    precio: any
  ) {
    this.frmEvento.controls['name'].setValue(nombre)
    this.frmEvento.controls['description'].setValue(descripcion)
    this.frmEvento.controls['dateStart'].setValue(fechaIni)
    this.frmEvento.controls['timeStart'].setValue(horaIni)
    this.frmEvento.controls['price'].setValue(precio)
  }

  /**
   * Rellena el campo ubicación del formulario
   * @param ubi
   */
  datosCampoUbicacion(ubi: any) {
    this.frmEvento.controls['ubi'].setValue(ubi)
  }

  /**
   * Guarda en un array las etiquetas obtenidas de la llamada al servicio
   */
  getTags() {
    this.etiquetaService.readTags().subscribe((resp) => {
      if (resp) {
        this.tagsList = resp
      }
    })
  }

  /**
   * Muestra una alerta con el mensaje recibido por parámetro
   * @param message
   */
  openSnackBar(message: any) {
    this._snackBar
      .open(message, 'UNDO', {
        duration: this.durationInSeconds * 1000
      })
      .afterOpened()
      .subscribe(() => {
        if (!this._router.url.includes('saveEvent/' + this.evento.id)) {
          this._router.navigateByUrl('/listEvents')
        }
      })
  }

  /**
   * Llama a un componente que muestar una alerta
   * @param isAdmin
   * @param id
   */
  openDeleteDialog(isAdmin: boolean, id: any): void {
    this.dialog
      .open(DeleteEventoComponent, {
        width: '250px',
        data: {
          isAdmin: isAdmin,
          eventoId: id
        }
      })
      .afterClosed()
      .subscribe(() => {
        this._router.navigateByUrl('/listEvents')
      })
  }
}
