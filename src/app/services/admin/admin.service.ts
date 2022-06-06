import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private user:any;
  private url = 'http://localhost/apirestangular/api/admin';

  constructor(private http: HttpClient) {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
  }

  // Eventos

  listAllEvents(): Observable<any> {
    return this.http.get(`${this.url}/events/listEvents.php`);
  }

  deleteEvent(eventoId: number): Observable<any> {
    return this.http.delete(
      `${this.url}/events/deleteEvent.php?eventoId=${eventoId}`
    );
  }

  editEvent(event: Event, id: any): Observable<any> {
    return this.http.put(
      `${this.url}/events/editEvent.php?eventoId=${id}`,
      JSON.stringify(event)
    );
  }

  getEvent(id: number): Observable<any> {
    return this.http.get(`${this.url}/events/getEvent.php?eventoId=${id}`);
  }

  // Usuarios

  listAllUsers(): Observable<any> {
    return this.http.get(`${this.url}/users/listUsers.php?usuarioId=${this.user.id}`);
  }

  deleteUser(usuarioId: number): Observable<any> {
    return this.http.delete(
      `${this.url}/users/deleteUser.php?usuarioId=${usuarioId}`
    );
  }

  editUser(event: Event, id: any): Observable<any> {
    return this.http.put(
      `${this.url}/users/editUser.php?usuarioId=${id}`,
      JSON.stringify(event)
    );
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.url}/users/getUser.php?usuarioId=${id}`);
  }
}
