import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IApiUserAuthenticated } from '../../models/iapi-user-authenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: BehaviorSubject<IApiUserAuthenticated>;
  public nameUserLS: string = 'currentUserDesigncode';

  url = 'http://localhost/apirestangular/api/auth';

  constructor(private httpClient: HttpClient, private _router: Router) {
    this.currentUser = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this.nameUserLS)!)
    );
  }

  get getUser(): IApiUserAuthenticated {
    return this.currentUser.value;
  }

  // email & password
  login(datos: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}/login.php`,
      JSON.stringify(datos)
    );
  }

  logout(){
    localStorage.removeItem(this.nameUserLS);
    this.currentUser.next(null!);
    this._router.navigateByUrl('/');
  }

  setUserToLocalStorage(user: IApiUserAuthenticated) {
    localStorage.setItem(this.nameUserLS, JSON.stringify(user));
    this.currentUser.next(user);
  }
}
