import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { Usuario } from '../../models/user/usuario'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URL = environment.API_URL
  private url = this.API_URL + '/apirestangular/api/user'

  constructor(private http: HttpClient, private _router: Router) {}

  createUser(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.url}/createUser.php`, JSON.stringify(usuario))
  }

  readUser(id: number): Observable<any> {
    return this.http.get(`${this.url}/readUser.php?id=${id}`)
  }
  readUserIdToken(id_token: string): Observable<any> {
    return this.http.get(`${this.url}/readUserIdToken.php?id=${id_token}`)
  }

  updateUser(usuario: Usuario, id: any): Observable<any> {
    return this.http.post(
      `${this.url}/updateUser.php?id=${id}`,
      JSON.stringify(usuario)
    )
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/deleteUser.php?id=${id}`)
  }
}
