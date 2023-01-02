import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private _router: Router) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this._router.navigate(['/login']);
    }
    this.toastr.error(error.error.message, 'Error');
    return throwError(() => error);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('form auth interceptor');
    return next
      .handle(request)
      .pipe(catchError((error) => this.handleError(error)));
  }
}
