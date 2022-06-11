import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  API_URL = environment.API_URL
  private url = this.API_URL + '/apirestangular/api/cities'
  private userId: number | undefined

  constructor(private http: HttpClient) {
    if (localStorage.getItem('user')) {
      let usuario = JSON.parse(localStorage.getItem('user')!)
      this.userId = usuario.id
    }
  }

  createCity() {}
  deleteCity() {}
  readCity(id: number = 0): Observable<any> {
    return this.http.get(`${this.url}/readCity.php?ciudadId=${id}`)
  }
}
