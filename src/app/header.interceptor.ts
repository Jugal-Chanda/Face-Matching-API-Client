import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('from header interceptor');
    const token = this._authService.getAuthenticationToken();
    const options = {
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    };
    const newReq = request.clone(options);
    return next.handle(newReq);
  }
}
