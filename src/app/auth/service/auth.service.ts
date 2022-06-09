import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: BehaviorSubject<any>;
  public nameUserLS: string = 'user';

  url = 'http://localhost/apirestangular/api/auth';

  constructor(private httpClient: HttpClient, private _router: Router) {
    this.currentUser = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this.nameUserLS)!)
    );
  }

  /**
   * Devuelve el usuario actual
   */
  get getUser(): any {
    return this.currentUser.value;
  }

  /**
   * Devuelve el usuario registrado
   * @param datos
   * @returns
   */
  register(datos: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}/register.php`,
      JSON.stringify(datos)
    );
  }

  /**
   * Devuelve el usuario logueado
   * @param datos
   * @returns
   */
  login(datos: any): Observable<any> {
    return this.httpClient.post(`${this.url}/login.php`, JSON.stringify(datos));
  }

  /**
   * Elimina la sesión del usuario
   */
  logout() {
    localStorage.removeItem(this.nameUserLS);
    this.currentUser.next(null!);
    this._router.navigateByUrl('/');
    window.location.reload();
  }

  /**
   * Guarda el usuarion en sesión
   * @param user
   */
  setUserToLocalStorage(user: any) {
    localStorage.setItem(this.nameUserLS, JSON.stringify(user));
    this.currentUser.next(user);
  }
}
