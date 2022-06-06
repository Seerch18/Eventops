import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EventoService } from '../../../services/events/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../../../models/Evento';
import { AdminService } from '../../../services/admin/admin.service';
import { EtiquetaService } from '../../../services/etiquetas/etiqueta.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteComponent } from '../../dialog/delete/delete.component';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css'],
})
export class CrearEventoComponent implements OnInit {
  public frmEvento: FormGroup;
  public evento: Evento;
  public currentPosition: any;
  public newPosition: any;
  public fechaMin: Date; // pipe
  private user: any;
  public tagsList: Array<any>; // array con todas las etiquetas
  public tags = new FormControl();
  public eventTags: Array<any>;
  @Input() position = {
    lat: 37.88785365229443,
    lng: -4.779458242357073,
  };
  durationInSeconds = 5;

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
    this.fechaMin = new Date();
    this.evento = {} as Evento;
    this.tagsList = [];
    this.eventTags = [];
    this.frmEvento = this.frmBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      dateStart: new FormControl('', Validators.required),
      timeStart: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required),
      ubi: new FormControl('', Validators.required),
      price: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getLSUser();
    this.getTags();
    let botonEvento = document.getElementById('botonEvento');
    let botonCancelarBorrar = document.getElementById('botonCancelarBorrar');
    if (this.params.snapshot.paramMap.get('id')) {
      let id = this.params.snapshot.paramMap.get('id');
      this.addDataFields(id);
      this.addTags(id);
      if (botonEvento) botonEvento.textContent = 'Actualizar Evento';
      if (botonCancelarBorrar)
        botonCancelarBorrar.textContent = 'Borrar Evento';
    } else {
      this.setPosition();
    }
  }

  getLSUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
  }

  crearEditarEvento() {
    // editar
    if (this._router.url.includes('saveEvent/' + this.evento.id)) {
      console.log(this.frmEvento.value);
      if (this.user.rol == 'ADMIN') {
        this.adminService
          .editEvent(this.frmEvento.value, this.evento.id)
          .subscribe((resp) => {
            this.openSnackBar('Evento Actualizado');
          });
      } else {
        this.eventoService
          .editEvent(this.frmEvento.value, this.evento.id)
          .subscribe((resp: any) => {
            this.openSnackBar('Evento Actualizado');
          });
      }
    } else {
      // crear
      console.log(this.frmEvento.value);
      this.eventoService
        .saveEvent(this.frmEvento.value)
        .subscribe((resp: any) => {
          this.openSnackBar('Evento Creado');
        });
    }
  }

  // función a la que se llama desde app-googlemaps y se le pasa la nueva localización
  addPosition(newPosition: any) {
    this.newPosition = newPosition;
    this.datosCampoUbicacion(this.newPosition.lat + ';' + this.newPosition.lng);
  }

  // añade la ubicación en el campo del formulario
  setPosition() {
    let lat = 0;
    let lng = 0;
    if (history.state.lat == undefined || history.state.lng == undefined) {
      lat = this.position.lat;
      lng = this.position.lng;
    } else {
      this.currentPosition = history.state;
      lat = history.state.lat;
      lng = history.state.lng;
    }
    this.datosCampoUbicacion(lat + ';' + lng);
  }

  // añadir datos a los campos del formulario
  addDataFields(id: any) {
    if (this.user.rol == 'ADMIN') {
      this.adminService.getEvent(id).subscribe((evento) => {
        this.evento = evento;
        let fechaInicio = this.evento.fechaInicio.split(' ');

        this.datosCampoUbicacion(this.evento.ubicacion);
        this.datosCamposFormulario(
          this.evento.nombre,
          this.evento.descripcion,
          fechaInicio[0],
          fechaInicio[1],
          this.evento.precio
        );
      });
    } else {
      this.eventoService.getEvent(id).subscribe((evento) => {
        console.log(evento);
        this.evento = evento;
        let fechaInicio = this.evento.fechaInicio.split(' ');

        this.datosCampoUbicacion(this.evento.ubicacion);
        this.datosCamposFormulario(
          this.evento.nombre,
          this.evento.descripcion,
          fechaInicio[0],
          fechaInicio[1],
          this.evento.precio
        );
      });
    }
  }

  addTags(id: any) {
    this.etiquetaService.readEventTag(id).subscribe((resp) => {
      if (resp) {
        this.eventTags = resp;
        let tagsId: Array<any> = [];
        resp.forEach((element: any) => {
          tagsId.push(element.id);
        });
        this.frmEvento.controls['tags'].setValue(tagsId);
      }
    });
  }

  // elimina un evento y borra los datos de los campos del formulario
  cancelarBorrarEvento() {
    let boton = document.getElementById('botonCancelarBorrar');
    if (boton) {
      if (boton.innerHTML == 'Borrar Evento') {
        // eliminar evento de la bbdd
        this.openDialog('0ms', '0ms', 'evento', this.evento);
      } else {
        // vaciar todos los campos
        this.datosCamposFormulario('', '', '', '', '');
        this.frmEvento.controls['tags'].setValue('');
      }
    }
  }

  datosCamposFormulario(
    nombre: any,
    descripcion: any,
    fechaIni: any,
    horaIni: any,
    precio: any
  ) {
    this.frmEvento.controls['name'].setValue(nombre);
    this.frmEvento.controls['description'].setValue(descripcion);
    this.frmEvento.controls['dateStart'].setValue(fechaIni);
    this.frmEvento.controls['timeStart'].setValue(horaIni);
    this.frmEvento.controls['price'].setValue(precio);
  }

  datosCampoUbicacion(ubi: any) {
    this.frmEvento.controls['ubi'].setValue(ubi);
  }

  getTags() {
    this.etiquetaService.readTags().subscribe((resp) => {
      if (resp) {
        this.tagsList = resp;
      }
    });
  }

  openSnackBar(message: any) {
    this._snackBar
      .open(message, 'UNDO', {
        duration: this.durationInSeconds * 1000,
      })
      .afterOpened()
      .subscribe(() => {
        if (!this._router.url.includes('saveEvent/' + this.evento.id)) {
          this._router.navigateByUrl('/listEvents');
        }
      });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    element: any,
    object: any
  ): void {
    this.dialog.open(DeleteComponent, {
      width: '250px',
      data: {
        element: element,
        object: object,
      },
    });
  }
}
