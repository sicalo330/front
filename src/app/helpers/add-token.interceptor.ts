import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Entró al interceptor')
    console.log(request)
    this.loginService.getTokenDecoded()

    return next.handle(request);
  }
}
