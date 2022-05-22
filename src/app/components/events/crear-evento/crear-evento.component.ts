import { Component, Input, OnInit } from '@angular/core';
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
  public fechaMin: Date;

  @Input() position = {
    lat: 37.88785365229443,
    lng: -4.779458242357073,
  };

  constructor(
    private frmBuilder: FormBuilder,
    private eventoService: EventoService,
    private _router: Router,
    private params: ActivatedRoute,
    private auth: AuthService
  ) {
    this.fechaMin = new Date();
    this.evento = {} as Evento;
    this.frmEvento = this.frmBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      dateStart: new FormControl('', Validators.required),
      timeStart: new FormControl('', Validators.required),
      ubi: new FormControl('', Validators.required),
      price: new FormControl(''),
    });
  }

  ngOnInit(): void {
    let botonEvento = document.getElementById('botonEvento');
    let botonCancelarBorrar = document.getElementById('botonCancelarBorrar');
    if (this.params.snapshot.paramMap.get('id')) {
      let id = this.params.snapshot.paramMap.get('id');
      this.addDataFields(id);
      if (botonEvento) botonEvento.textContent = 'Actualizar Evento';
      if (botonCancelarBorrar)
        botonCancelarBorrar.textContent = 'Borrar Evento';
    } else {
      this.setPosition();
    }
  }

  crearEditarEvento() {
    // editar
    if (this._router.url.includes('saveEvent/' + this.evento.id)) {
      this.eventoService
        .editEvent(this.frmEvento.value, this.evento.id)
        .subscribe((resp: any) => {
          console.log(resp);
          if (!resp['edit']) {
            alert('No se ha podido actulizar el evento');
          }
        });
    } else {
      // crear
      this.eventoService
        .saveEvent(this.frmEvento.value)
        .subscribe((resp: any) => {
          console.log(resp);
          if (!resp['save']) {
            alert('No se ha podido crear el evento');
          }
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
      this.eventoService.getEvent(id).subscribe((evento) => {
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

  // elimina un evento y borra los datos de los campos del formulario
  cancelarBorrarEvento() {
    // vaciar todos los campos
    this.datosCamposFormulario('', '', '', '', '');

    let boton = document.getElementById('botonCancelarBorrar');
    if (boton) {
      if (boton.innerHTML == 'Borrar Evento') {
        // eliminar evento de la bbdd
        this.eventoService.deleteEvent(this.evento.id).subscribe((resp) => {
          if (!resp['delete']) {
            alert('Error al eliminar el registro');
          } else {
            this._router.navigateByUrl('/saveEvent');
          }
        });
        // this.frmEvento.controls['ubi'].setValue('');
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
}
