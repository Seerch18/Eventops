import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EventoService {
  url = 'http://localhost/apirestangular/api/events';

  constructor(private http: HttpClient) {}

  getEvent(id: number): Observable<any> {
    return this.http.get(`${this.url}/getEvent.php?id=${id}`);
  }

  listEvents(): Observable<any> {
    return this.http.get(`${this.url}/listEvents.php`);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.url}/deleteEvent.php?id=${id}`);
  }

  saveEvent(event: Event): Observable<any> {
    return this.http.post(`${this.url}/saveEvent.php`, JSON.stringify(event));
  }

  editEvent(event: Event): Observable<any> {
    return this.http.post(`${this.url}/editEvent.php`, JSON.stringify(event));
  }
}
