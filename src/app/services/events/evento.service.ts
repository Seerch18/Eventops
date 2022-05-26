import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private url = 'http://localhost/apirestangular/api/events';
  private urlFilters = 'http://localhost/apirestangular/api/filters';
  private urlLikes = 'http://localhost/apirestangular/api/likes';
  private userId: number | undefined;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('user')) {
      let usuario = JSON.parse(localStorage.getItem('user')!);
      console.log(usuario.id);
      this.userId = usuario.id;
    }
  }

  getEvent(id: number): Observable<any> {
    return this.http.get(
      `${this.url}/getEvent.php?eventoId=${id}&usuarioId=${this.userId}`
    );
  }

  listEvents(): Observable<any> {
    return this.http.get(`${this.url}/listEvents.php?id=${this.userId}`);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(
      `${this.url}/deleteEvent.php?eventoId=${id}&id=${this.userId}`
    );
  }

  saveEvent(event: Event): Observable<any> {
    return this.http.post(
      `${this.url}/saveEvent.php?id=${this.userId}`,
      JSON.stringify(event)
    );
  }

  editEvent(event: Event, id: any): Observable<any> {
    return this.http.post(
      `${this.url}/editEvent.php?eventoId=${id}&id=${this.userId}`,
      JSON.stringify(event)
    );
  }

  proximosEventos(): Observable<any> {
    return this.http.get(`${this.urlFilters}/recentEvents.php`);
  }

  createLike(eventoId: number): Observable<any> {
    let data = [
      {
        eventoId: eventoId,
        usuarioId: this.userId,
      },
    ];
    return this.http.post(
      `${this.urlLikes}/createLike.php`,
      JSON.stringify(data)
    );
  }

  deleteLike(eventoId: number): Observable<any> {
    return this.http.delete(
      `${this.urlLikes}/deleteLike.php?usuarioId=${this.userId}&eventoId=${eventoId}`
    );
  }

  getLikeEvents(): Observable<any> {
    return this.http.get(
      `${this.urlLikes}/readLike.php?usuarioId=${this.userId}`
    );
  }

  readEvent(eventoId: number): Observable<any> {
    return this.http.get(`${this.url}/readEvent.php?eventoId=${eventoId}`);
  }
}
