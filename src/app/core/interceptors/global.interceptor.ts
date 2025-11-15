import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  private readonly baseUrl: string = 'https://upskilling-egypt.com:3000/api/v0';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('userToken');

    const clonedRequest = request.clone({
      setHeaders: token ? { Authorization: `${token}` } : {},
      url: request.url.includes('assets') ? request.url : `${this.baseUrl}${request.url}`
    });

    return next.handle(clonedRequest);
  }
}
