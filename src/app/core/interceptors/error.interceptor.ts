import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err);
        if (
          [404].indexOf(err.status) !== -1 &&
          req.url !== '/login' &&
          req.url !== '/register'
        ) {
          this._router.navigateByUrl('not-found' + err.status);
        }
        return throwError(() => err.status);
      })
    );
    // throw new Error('Method not implemented.');
  }
}
