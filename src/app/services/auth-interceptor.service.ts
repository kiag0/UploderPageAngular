import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(public http: HttpClient, private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // const token = this.auth.getToken();
    // console.log('this is tokeeen' + token);
    // const urequest = req.clone({
    //   headers: req.headers.set('Authorization', 'Bearer ' + token)
    // });
    const urequest = req.clone({});
    return next.handle(urequest);

  }
}
