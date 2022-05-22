import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FiltrosService {
  private url = 'http://localhost/apirestangular/api/filters';
  private userId: number | undefined;
  constructor(private http: HttpClient) {
    if (localStorage.getItem('user')) {
      let usuario = JSON.parse(localStorage.getItem('user')!);
      this.userId = usuario.id;
    }
  }

  getFilteredEvents(data: any): Observable<any> {
    return this.http.post(`${this.url}/filters.php`, JSON.stringify(data));
  }
}
