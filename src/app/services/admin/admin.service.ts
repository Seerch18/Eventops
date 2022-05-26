import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private url = 'http://localhost/apirestangular/api/admin';

  constructor(private http: HttpClient) {}

  listAllEvents(): Observable<any> {
    return this.http.get(`${this.url}/events/listEvents.php`);
  }
}
