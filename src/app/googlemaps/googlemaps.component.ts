import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Output,
  EventEmitter,
  Renderer2,
  ViewChild,
  OnChanges
} from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { GooglemapsService } from './service/googlemaps.service'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators'
import { ModalEventoComponent } from '../components/events/modal-evento/modal-evento.component'
import { EventoService } from '../services/events/evento.service'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.css']
})
export class GooglemapsComponent implements OnInit, OnChanges {
  @Input() markers: any
  @Input() aMarkers: google.maps.Marker[] = []
  @Input() currentPosition: any // posición actual
  @Output() newPositionEvent = new EventEmitter<any>() // enviar la nueva posición al contenedor padre
  // posición en el mapa
  @Input() position = {
    lat: 37.88785365229443,
    lng: -4.779458242357073
  }

  // información del InfoWindow
  label = {
    titulo: 'choose location',
    subtitulo: ''
  }

  map: any
  marker: any
  pruebaMarker: any
  infowindow: any
  positionSet: any

  // dibujo del mapa
  @ViewChild('map')
  divMap!: ElementRef

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any,
    private googlemapsService: GooglemapsService,
    private _router: Router,
    private eventoService: EventoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this._router.url.includes('/saveEvent')) {
      this.addCurrentPosition()
    }
    this.init()
  }

  ngOnChanges(changes: any) {
    if (changes.markers) {
      this.deleteMarkers()
      this.addFilteredEventsMap(this.markers, this.map)
    }
  }

  async init() {
    this.googlemapsService
      .init(this.renderer, this.document)
      .then(() => {
        this.initMap()
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  initMap() {
    // coge una localización mockeada
    const position = this.position

    let latLng = new google.maps.LatLng(position.lat, position.lng)

    let mapOptions = {
      center: latLng,
      zoom: 15,
      disableDefaultUI: true,
      clickableIcons: false
    }

    this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions)
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: false
    })

    this.infowindow = new google.maps.InfoWindow()

    this.clickHandleEvent() // añade un evento click al mapa

    this.addMarker(position) // establece el marcador en el mapa
    this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo) // crea una venta en lo alto del marcador

    this.currentLocation() // marca en el mapa la ubicación en la que se encuentra el usuario (va mal)
  }

  clickHandleEvent() {
    this.map.addListener('click', (event: any) => {
      const position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      // añade la nueva posición al input de ubicación
      this.addNewPosition(position) // (/saveEvent)
      this.addMarker(position)
      this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo)
    })
  }

  /**
   * Añada un marcador al mapa
   * @param position
   */
  addMarker(position: any): void {
    let latLng = new google.maps.LatLng(position.lat, position.lng)
    this.marker.setPosition(latLng)
    this.map.panTo(position)
    this.positionSet = position
  }

  setInfoWindow(marker: any, titulo: string, subtitulo: string) {
    let contenedor = this.document.createElement('div')
    contenedor.id = 'contentInsideMap'
    let title = this.document.createElement('p')
    title.textContent = titulo
    let subtitle = this.document.createElement('p')
    // subtitle.textContent = subtitulo;
    let content = this.document.createElement('div')
    content.id = 'bodyContent'
    content.appendChild(subtitle)
    contenedor.appendChild(title)
    contenedor.appendChild(content)

    if (!this._router.url.includes('/saveEvent')) {
      let botonCrear = this.document.createElement('button')
      botonCrear.textContent = 'Create Event'
      botonCrear.classList.add('btn-sm')
      botonCrear.classList.add('btn-primary')
      botonCrear.classList.add('m-2')
      botonCrear.addEventListener('click', () => {
        this._router.navigate(['/saveEvent'], { state: this.positionSet })
      })
      content.appendChild(botonCrear)
    }
    this.infowindow.setContent(contenedor)
    this.infowindow.open(this.map, marker)
    marker.addListener('click', () => {
      this.infowindow.close()
      this.infowindow.open(this.map, marker)
    })
  }

  // -----------------------------------------------------------------------
  currentLocation() {
    const locationButton = this.document.createElement('button')
    locationButton.textContent = 'Current Location'
    locationButton.classList.add('custom-map-control-button')
    locationButton.style.cssText =
      ' z-index: 0;position: absolute;top: 0px;left: 334px;border: 0;border-radius: 2px;box-shadow: 0 1px 4px -1px rgb(0 0 0 / 30%);margin: 10px;padding: 0 0.5em;font: 400 18px Roboto, Arial, sans-serif;overflow: hidden;height: 40px;cursor: pointer;'
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      locationButton
    )

    locationButton.addEventListener('click', () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }

            this.infowindow.setPosition(pos)
            this.infowindow.setContent('Location found.')
            this.infowindow.open(this.map)
            this.map.setCenter(pos)
          },
          () => {
            this.handleLocationError(
              true,
              this.infowindow,
              this.map.getCenter()!
            )
          }
        )
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, this.infowindow, this.map.getCenter()!)
      }
    })
  }

  handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng
  ) {
    infoWindow.setPosition(pos)
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    )
    infoWindow.open(this.map)
  }
  // -----------------------------------------------------------------------

  addNewPosition(value: any) {
    this.newPositionEvent.emit(value)
  }

  addCurrentPosition() {
    if (this.currentPosition != null && this.currentPosition != '')
      this.position = this.currentPosition
  }

  addFilteredEventsMap(markers: any, map: any) {
    if (markers) {
      markers.forEach((element: any) => {
        let infowindow = new google.maps.InfoWindow()

        let latLng = element.ubicacion.split(';')
        const marker = new google.maps.Marker({
          position: {
            lat: parseFloat(latLng[0]),
            lng: parseFloat(latLng[1])
          },
          map
        })
        let contenido = this.infoContent(
          element.nombre,
          element.fechaInicio,
          element.id
        )
        marker.addListener('click', () => {
          infowindow.close()
          infowindow.setContent(contenido)
          infowindow.open(this.map, marker)
        })
        this.aMarkers.push(marker)
      })
    }
  }

  infoContent(nombre: any, fechaInicio: any, id: any) {
    let contenedor = this.document.createElement('div')
    contenedor.id = 'contentInsideMap'
    contenedor.classList.add('d-flex')
    contenedor.classList.add('justify-content-center')
    contenedor.classList.add('align-items-center')
    contenedor.classList.add('flex-column')
    let title = this.document.createElement('p')
    title.textContent = nombre
    let subtitle = this.document.createElement('p')
    subtitle.textContent = fechaInicio
    let content = this.document.createElement('div')
    content.id = 'bodyContent'
    content.appendChild(subtitle)
    contenedor.appendChild(title)
    contenedor.appendChild(content)
    let boton = this.document.createElement('button')
    boton.textContent = 'Show Event'
    boton.classList.add('btn-sm')
    boton.classList.add('btn-primary')
    boton.classList.add('m-2')
    boton.addEventListener('click', () => {
      this.openDialog(id)
    })
    content.appendChild(boton)
    return contenedor
  }

  // Sets the map on all markers in the array.
  setMapOnAll(map: google.maps.Map | null) {
    for (let i = 0; i < this.aMarkers.length; i++) {
      this.aMarkers[i].setMap(map)
    }
  }

  deleteMarkers(): void {
    this.setMapOnAll(null)
    this.aMarkers = []
  }

  openDialog(eventoId: number) {
    this.eventoService.readEvent(eventoId).subscribe((resp) => {
      if (resp) {
        this.dialog.open(ModalEventoComponent, {
          height: '600px',
          width: '800px',
          data: resp
        })
      }
    })
  }
}
