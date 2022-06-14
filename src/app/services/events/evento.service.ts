import { Injectable, Output, EventEmitter } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class EventoService {
  API_URL = environment.API_URL

  private url = this.API_URL + '/apirestangular/api/events'
  private urlFilters = this.API_URL + '/apirestangular/api/filters'
  private urlLikes = this.API_URL + '/apirestangular/api/likes'
  private urlEventSub = this.API_URL + '/apirestangular/api/eventSub'
  private userId: number | undefined

  constructor(private http: HttpClient) {
    if (localStorage.getItem('user')) {
      let usuario = JSON.parse(localStorage.getItem('user')!)
      this.userId = usuario.id
    }
  }

  getEvent(id: number): Observable<any> {
    return this.http.get(
      `${this.url}/getEvent.php?eventoId=${id}&usuarioId=${this.userId}`
    )
  }

  listEvents(): Observable<any> {
    return this.http.get(`${this.url}/listEvents.php?id=${this.userId}`)
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(
      `${this.url}/deleteEvent.php?eventoId=${id}&id=${this.userId}`
    )
  }

  saveEvent(event: Event): Observable<any> {
    return this.http.post(
      `${this.url}/saveEvent.php?id=${this.userId}`,
      JSON.stringify(event)
    )
  }

  editEvent(event: Event, id: any): Observable<any> {
    return this.http.put(
      `${this.url}/editEvent.php?eventoId=${id}&id=${this.userId}`,
      JSON.stringify(event)
    )
  }

  proximosEventos(): Observable<any> {
    return this.http.get(`${this.urlFilters}/recentEvents.php`)
  }

  createLike(eventoId: number): Observable<any> {
    let data = [
      {
        eventoId: eventoId,
        usuarioId: this.userId
      }
    ]
    return this.http.post(
      `${this.urlLikes}/createLike.php`,
      JSON.stringify(data)
    )
  }

  deleteLike(eventoId: number): Observable<any> {
    return this.http.delete(
      `${this.urlLikes}/deleteLike.php?usuarioId=${this.userId}&eventoId=${eventoId}`
    )
  }

  getLikeEvents(eventoId: number = 0): Observable<any> {
    return this.http.get(
      `${this.urlLikes}/readLike.php?usuarioId=${this.userId}&eventoId=${eventoId}`
    )
  }

  readEvent(eventoId: number): Observable<any> {
    return this.http.get(`${this.url}/readEvent.php?eventoId=${eventoId}`)
  }

  readParticipacionesEvento(
    eventoId: number,
    idUsu: boolean = false
  ): Observable<any> {
    let usuId: any = 0
    if (idUsu) {
      usuId = this.userId
    }
    return this.http.get(
      `${this.urlEventSub}/readEventSub.php?eventoId=${eventoId}&usuarioId=${usuId}`
    )
  }

  crearParticipacion(eventoId: number): Observable<any> {
    return this.http.get(
      `${this.urlEventSub}/createEventSub.php?usuarioId=${this.userId}&eventoId=${eventoId}`,
      {}
    )
  }

  eliminarParticipacion(eventoId: number): Observable<any> {
    return this.http.delete(
      `${this.urlEventSub}/deleteEventSub.php?usuarioId=${this.userId}&eventoId=${eventoId}`
    )
  }
}
