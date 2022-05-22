import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {
  private url = 'http://localhost/apirestangular/api/cities';
  private userId: number | undefined;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('user')) {
      let usuario = JSON.parse(localStorage.getItem('user')!);
      this.userId = usuario.id;
    }
  }

  createCity() {}
  deleteCity() {}
  readCity(id: number = 0): Observable<any> {
    return this.http.get(`${this.url}/readCity.php?ciudadId=${id}`);
  }
}
