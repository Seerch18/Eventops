import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GooglemapsService } from './service/googlemaps.service';
import { EventoService } from '../services/events/evento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.css'],
})
export class GooglemapsComponent implements OnInit {
  // posición en el mapa

  @Input() currentPosition: any;

  @Input() position = {
    lat: 37.88785365229443,
    lng: -4.779458242357073,
  };

  // información del InfoWindow
  label = {
    titulo: 'Ubicación',
    subtitulo: 'Mi ubicación de envío',
  };

  map: any;
  marker: any;
  infowindow: any;
  positionSet: any;

  // dibujo del mapa
  @ViewChild('map')
  divMap!: ElementRef;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any,
    private googlemapsService: GooglemapsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (this.currentPosition != null && this.currentPosition != '') {
      if (
        this.currentPosition.lat != null &&
        this.currentPosition.lat != '' &&
        this.currentPosition.lng != null &&
        this.currentPosition.lng != ''
      ) {
        console.log('entra');
        this.position = this.currentPosition;
      }
    }

    this.init();
  }

  async init() {
    this.googlemapsService
      .init(this.renderer, this.document)
      .then(() => {
        this.initMap();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  initMap() {
    const position = this.position;

    let latLng = new google.maps.LatLng(position.lat, position.lng);

    let mapOptions = {
      center: latLng,
      zoom: 18,
      disableDefaultUI: true,
      clickableIcons: false,
    };

    this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: false,
    });
    this.infowindow = new google.maps.InfoWindow();
    this.clickHandleEvent();
    if (this.label.titulo.length) {
      this.addMarker(position);
      this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);
    }
    this.currentLocation();
  }

  clickHandleEvent() {
    this.map.addListener('click', (event: any) => {
      const position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      console.log(position);
      if (this.label.titulo.length) {
        this.addMarker(position);
        this.setInfoWindow(
          this.marker,
          this.label.titulo,
          this.label.subtitulo
        );
      }
    });
  }

  addMarker(position: any): void {
    let latLng = new google.maps.LatLng(position.lat, position.lng);

    this.marker.setPosition(latLng);
    this.map.panTo(position);
    this.positionSet = position;
  }

  setInfoWindow(marker: any, titulo: string, subtitulo: string) {
    let contenedor = this.document.createElement('div');
    contenedor.id = 'contentInsideMap';
    let title = this.document.createElement('p');
    title.textContent = titulo;
    let subtitle = this.document.createElement('p');
    subtitle.textContent = subtitulo;
    let content = this.document.createElement('div');
    content.id = 'bodyContent';
    content.appendChild(subtitle);
    contenedor.appendChild(title);
    contenedor.appendChild(content);

    if (this._router.url != '/saveEvent') {
      let botonCrear = this.document.createElement('button');
      botonCrear.textContent = 'Crear Evento';
      botonCrear.classList.add('btn-sm');
      botonCrear.classList.add('btn-primary');
      botonCrear.classList.add('m-2');
      botonCrear.addEventListener('click', () => {
        this._router.navigate(['/saveEvent'], { state: this.positionSet });
      });
      content.appendChild(botonCrear);
    }

    this.infowindow.setContent(contenedor);
    this.infowindow.open(this.map, marker);
  }

  currentLocation() {
    const locationButton = this.document.createElement('button');
    locationButton.textContent = 'Current Location';
    locationButton.classList.add('custom-map-control-button');
    locationButton.style.cssText =
      ' z-index: 0;position: absolute;top: 0px;left: 334px;border: 0;border-radius: 2px;box-shadow: 0 1px 4px -1px rgb(0 0 0 / 30%);margin: 10px;padding: 0 0.5em;font: 400 18px Roboto, Arial, sans-serif;overflow: hidden;height: 40px;cursor: pointer;';
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      locationButton
    );

    locationButton.addEventListener('click', () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            this.infowindow.setPosition(pos);
            this.infowindow.setContent('Location found.');
            this.infowindow.open(this.map);
            this.map.setCenter(pos);
          },
          () => {
            this.handleLocationError(
              true,
              this.infowindow,
              this.map.getCenter()!
            );
          }
        );
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, this.infowindow, this.map.getCenter()!);
      }
    });
  }

  handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.map);
  }

  crearEvento() {
    alert('crear evento');
    this._router.navigate(['/saveEvent'], { state: this.position });
  }
}
