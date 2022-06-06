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

  get getUser(): any {
    return this.currentUser.value;
  }

  register(datos: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}/register.php`,
      JSON.stringify(datos)
    );
  }

  // email & password
  login(datos: any): Observable<any> {
    return this.httpClient.post(`${this.url}/login.php`, JSON.stringify(datos));
  }

  logout() {
    localStorage.removeItem(this.nameUserLS);
    this.currentUser.next(null!);
    this._router.navigateByUrl('/');
    window.location.reload();
  }

  setUserToLocalStorage(user: any) {
    localStorage.setItem(this.nameUserLS, JSON.stringify(user));
    this.currentUser.next(user);
  }
}
