import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {environment} from '@environments/environment';
import {AccountService} from '@app/_services';
import {Observable} from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    const account = this.accountService.accountValue;
    const isLoggedIn = account && account.jwtToken;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${account.jwtToken}` }
      });
    }

    return next.handle(request);
  }
}

