import { Injectable, OnInit, } from '@angular/core';
// import { type } from 'os';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';
import { isArray, isObject } from 'util';
type ICallback = (response: any) => void;

@Injectable({
  providedIn: 'root'
})
export class DBService implements OnInit {
  token: string;
  static islogin = true;
  // rooturi = 'http://127.0.0.1:8000/';
  rooturi = 'https://api.passivereferral.com/';
  // var rooturi = "http://localhost:8000/";
  // var rooturi = "http://192.168.1.198:8080/laravel/public/";
  ServiceURL = this.rooturi + 'index.php/api/';
  CurrentURL: string;
  LoginURL = 'login';
  clientsdepartment = '';
  profile: any = {};
  PF: any = {};
  mp:any={};
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {

  }
  setProfile():any {

    
     this.list('profile/', null, ((response): void => {

      if (response.is_ats == '0') {
        this.clientsdepartment = 'Department';
      }

      this.profile = response;
      this.profile.profilepic = this.rooturi + 'profile/' + this.profile.profilepic;
      this.PF = response;
      document.title = 'PR : ' + this.profile.application;

    }));


    this.list('mypermission/', null, ((response): void => {

      var data = response.data;
      this.mp = {};
      for (var i in data) {
          this.mp[data[i].slug] = true;
      }

    }));
  }
  ngOnInit() {
    this.setProfile();
  //   if (this.profile.id == 53) {
  //     this.db.list('smsemailreport/', null, ((response): void =>  {
  //       this.smsemailreports = response;
  //     }));
  //     this.showemailmsgreports = true;
  // } else
  // {
  //     this.showemailmsgreports = false;
  // }
    this.token = localStorage.token;
  }
  getToken(): string {
    if (localStorage.token) {
      this.token = localStorage.token;
      return this.token;
    } else {
      this.goToLogin({});
    }
  }
  goToLogin(response): void {
    if (response && response && response.msg) {
      alert(response.msg);
    }
    if (this.CurrentURL === undefined || this.CurrentURL === '') {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['login']);
      // window.top.location.href = this.LoginURL + '?returnurl=' + this.CurrentURL;
    }
  }
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', this.token);

  }

  showMessage(message: any, action?: string, durationMS?: number): void {
    debugger;

    if (isObject(message) && message.status === 0) {
      message = 'Please check your internet';
    }

    console.log(message);
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
    //   for (var k in response) {
    //     var message = response[k].toString();
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
    if (data === undefined || data === null) {
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
        response => {
          this.hideLoaderfunction(loader);
          this.showMessage(response);
          if (response.status === 401 || (response.hasOwnProperty('error') && response.error === 'token_not_provided')) {
            this.goToLogin(response);
          } else {
            if (fail !== undefined) {

              fail(response);
            }
          }
        }
      );

  }


  store(url: string, data?: any, success?: ICallback, fail?: ICallback, loader?): any {


    //  success('avc');


    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === - 1) {
      fullurl = this.ServiceURL + url;
    }
    const req = {
      method: 'post',
      url: fullurl
    };
    if (data === undefined) {
      data = {};
    }
    data.token = this.getToken();
    const headersfull = new HttpHeaders();
    headersfull.append('Content-Type', 'application/x-www-form-urlencoded');
    // post data missing(here you pass email and password)

    return this.http.post(req.url, { headers: headersfull, params: data })
      .subscribe(
        res => {
          if (success !== undefined) {
            success(res);
          }
        },
        response => {
          this.hideLoaderfunction(loader);
          this.showMessage(response);
          if (response.status === 401 || (response.hasOwnProperty('error') && response.error === 'token_not_provided')) {
            this.goToLogin(response);
          } else {
            if (fail !== undefined) {

              fail(response);
            }
          }
        }
      );

  }


  show(url: string, id?: any, success?: ICallback, fail?: ICallback, loader?): any {


    //  success('avc');


    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === - 1) {
      fullurl = this.ServiceURL + url + id;
    }
    const req = {
      method: 'post',
      url: fullurl
    };
    let data;
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
        response => {
          this.hideLoaderfunction(loader);
          this.showMessage(response);
          if (response.status === 401 || (response.hasOwnProperty('error') && response.error === 'token_not_provided')) {
            this.goToLogin(response);
          } else {
            if (fail !== undefined) {

              fail(response);
            }
          }
        }
      );

  }



  update(url: string, id?: any, data?: any, success?: ICallback, fail?: ICallback, loader?): any {


    //  success('avc');


    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === - 1) {
      fullurl = this.ServiceURL + url + 'update/' + id;
    }
    const req = {
      method: 'post',
      url: fullurl
    };
    if (data === undefined) {
      data = {};
    }
    data.token = this.getToken();
    const headersfull = new HttpHeaders();
    headersfull.append('Content-Type', 'application/x-www-form-urlencoded');
    // post data missing(here you pass email and password)

    return this.http.post(req.url, { headers: headersfull, params: data })
      .subscribe(
        res => {
          if (success !== undefined) {
            success(res);
          }
        },
        response => {
          this.hideLoaderfunction(loader);
          this.showMessage(response);
          if (response.status === 401 || (response.hasOwnProperty('error') && response.error === 'token_not_provided')) {
            this.goToLogin(response);
          } else {
            if (fail !== undefined) {

              fail(response);
            }
          }
        }
      );

  }

  destroy(url: string, id?: any, success?: ICallback, fail?: ICallback, loader?): any {


    //  success('avc');


    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === - 1) {
      fullurl = this.ServiceURL + url + 'delete/' + id;
    }
    const req = {
      method: 'post',
      url: fullurl
    };
    let data;
    if (data === undefined) {
      data = {};
    }
    data.token = this.getToken();
    const headersfull = new HttpHeaders();
    headersfull.append('Content-Type', 'application/x-www-form-urlencoded');
    // post data missing(here you pass email and password)

    return this.http.post(req.url, { headers: headersfull, params: data })
      .subscribe(
        res => {
          if (success !== undefined) {
            success(res);
          }
        },
        response => {
          this.hideLoaderfunction(loader);
          this.showMessage(response);
          if (response.status === 401 || (response.hasOwnProperty('error') && response.error === 'token_not_provided')) {
            this.goToLogin(response);
          } else {
            if (fail !== undefined) {

              fail(response);
            }
          }
        }
      );

  }



}
