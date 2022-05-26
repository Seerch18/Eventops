import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EtiquetaService {
  private url = 'http://localhost/apirestangular/api/tags';
  private userId: number | undefined;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('user')) {
      let usuario = JSON.parse(localStorage.getItem('user')!);
      this.userId = usuario.id;
    }
  }

  createTag() {}
  deleteTag() {}
  readTags(id: number = 0): Observable<any> {
    return this.http.get(`${this.url}/readTag.php?id=${id}`);
  }
}
