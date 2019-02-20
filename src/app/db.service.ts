import { Injectable, OnInit, } from '@angular/core';
// import { type } from 'os';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { MatSnackBar } from '@angular/material';
type ICallback = (response: any) => void;

@Injectable({
  providedIn: 'root'
})
export class DBService implements OnInit {
  token: string;

  // rooturi = 'http://127.0.0.1:8000/';
  rooturi = 'https://api.passivereferral.com/';
  // var rooturi = "http://localhost:8000/";
  // var rooturi = "http://192.168.1.198:8080/laravel/public/";
  ServiceURL = this.rooturi + 'index.php/api/';
  CurrentURL: string;
  LoginURL = 'login';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {

  }
  ngOnInit() {
    this.token = localStorage.token;
  }
  getToken(): string {
    this.token = localStorage.token;
    return this.token;
  }
  goToLogin(response): void {
    if (response && response.data && response.data.msg) {
      alert(response.data.msg);
    }
    if (this.CurrentURL === undefined || this.CurrentURL === '') {
      window.top.location.href = this.LoginURL;
    } else {
      window.top.location.href = this.LoginURL + '?returnurl=' + this.CurrentURL;
    }
  }
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', this.token);

  }

  showMessage(message: string, action?: string, durationMS?: number): void {
    if (action === undefined) {
      action = 'Message';
    }
    if (durationMS === undefined) {
      durationMS = 3000;
    }
    const snackBarRef = this.snackBar.open(message, action, {
      duration: durationMS,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
    });

    // $rootScope.universal_errors = [];
    // if (response.status == 422) {
    //   debugger;
    //   for (var k in response.data) {
    //     var message = response.data[k].toString();
    //     $rootScope.universal_errors.push({ message: message, data: true });
    //   }
    //   $('#errorMessage').modal('show');
    // }
  }
  hl(): void {
    // $rootScope.ShowLoader = false;
  }
  sl(): void {
    // $rootScope.ShowLoader = true;
  }
  showloaderfunction(loader): void {

  }
  hideLoaderfunction(loader): void {

  }
  post(url: string, data: any, success?: ICallback, fail?: ICallback, loader?): any {


    //  success('avc');


    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === - 1) {
      fullurl = this.ServiceURL + url;
    }
    const req = {
      method: 'POST',
      url: fullurl
    };
    const headersfull = new HttpHeaders();
    headersfull.append('Content-Type', 'application/x-www-form-urlencoded');
    // post data missing(here you pass email and password)

    return this.http.post(req.url, data, { headers: headersfull })
      .subscribe(
        res => {
          if (success !== undefined) {
            success(res);
          }
        },
        err => {
          if (fail !== undefined) {
            fail(err);
          }
        }
      );

  }

  get(url: string, data: any, success?: ICallback, fail?: ICallback, loader?): any {


    //  success('avc');


    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === - 1) {
      fullurl = this.ServiceURL + url;
    }
    const req = {
      method: 'POST',
      url: fullurl
    };
    const headersfull = new HttpHeaders();
    headersfull.append('Content-Type', 'application/x-www-form-urlencoded');
    // post data missing(here you pass email and password)

    return this.http.get(req.url, { headers: headersfull, params: data })
      .subscribe(
        res => {
          if (success !== undefined) {
            success(res);
          }
        },
        err => {
          if (fail !== undefined) {
            fail(err);
          }
        }
      );

  }

  list(url: string, data?: any, success?: ICallback, fail?: ICallback, loader?): any {


    //  success('avc');


    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === - 1) {
      fullurl = this.ServiceURL + url;
    }
    const req = {
      method: 'get',
      url: fullurl
    };
    if (data === undefined) {
      data = {};
    }
    data.token = this.getToken();
    const headersfull = new HttpHeaders();
    headersfull.append('Content-Type', 'application/x-www-form-urlencoded');
    // post data missing(here you pass email and password)

    return this.http.get(req.url, { headers: headersfull, params: data })
      .subscribe(
        res => {
          if (success !== undefined) {
            success(res);
          }
        },
        err => {
          if (fail !== undefined) {
            fail(err);
          }
        }
      );

  }
}
