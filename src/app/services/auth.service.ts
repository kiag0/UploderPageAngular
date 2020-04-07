import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import {Auth} from '../models/auth.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Url = 'http://localhost:4000/api/hymn/';
  // private Url = "https://young-forest-02290.herokuapp.com/api/hymn/";
  // private countUrl = "https://young-forest-02290.herokuapp.com/api/hymn/count/";
  private countUrl = 'http://localhost:4000/api/hymn/count/';
  public hymnCount: any;
  private token: string;
  private loginListener = new Subject<boolean>();
  private counterListener = new Subject<number>();
  initCountListener = new Subject();
  private authStatusListener = new Subject<boolean>();

  constructor(public http: HttpClient, private router: Router) { }

  defaultLogin(form: NgForm) {
      const userInfo: Auth = {
        phone: form.value.phone,
        password: form.value.password,
      };

      this.http.post(this.Url, userInfo)
      .subscribe((data: {message: string, token: string}) => {
        console.dir(data);
        if (data.message) {
          const info = data.message;
          this.loginListener.next(true);
          Swal.fire({
            title: 'Sorry!',
            text: info,
            icon: 'error',
            confirmButtonText: 'ok'
          });
        } else {
          this.loginListener.next(false);
          this.token = data.token;
          this.router.navigate(['/add']);
        }
      }, err => {
        console.dir('error making call:' + err);
      }
      );

  }

  addHymn(hymn) {
    this.http.post<{message: string, title: string}>(this.Url, hymn)
    .subscribe(res => {
      if (res.message === 'true') {
        this.counterListener.next(1);
        Swal.fire({
          title: 'Hey!',
          text: `${res.title} successfully added`,
          icon: 'success',
          confirmButtonText: 'ok'
        });

      } else {
        Swal.fire({
          title: 'Something went wrong!',
          text: res.message,
          icon: 'error',
          confirmButtonText: 'ok'
        });
      }

    });
  }

  getCounter() {
    this.http.get<{count: number}>(this.countUrl)
    .subscribe(res => {
      console.log('called from service' + res.count);
      this.initCountListener.next(res.count);
      this.hymnCount = res.count;
    });
  }

  pushUploadPage() {
    this.router.navigate(['/add']);
  }

  loginFailed() {
    Swal.fire({
      title: 'Wrong credentials!',
      text: 'try again',
      icon: 'error',
      confirmButtonText: 'ok'
    });
  }


  getToken() {
    return this.token;
  }

  getloginListener() {
    return this.loginListener.asObservable();
  }

  getCounterListener() {
    return this.counterListener.asObservable();
  }

}// end of service
