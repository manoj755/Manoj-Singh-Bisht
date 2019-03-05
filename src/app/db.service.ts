import { Injectable, OnInit, } from '@angular/core';
// import { type } from 'os';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { isArray, isObject } from 'util';
import { LargeTextCellEditor } from 'ag-grid-community';
type ICallback = (response: any) => void;
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class DBService implements OnInit {
  static islogin = true;
  token: string;
  // rooturi = 'http://127.0.0.1:8000/';
  rooturi = 'https://api.passivereferral.com/';
  // var rooturi = 'http://localhost:8000/';
  // var rooturi = 'http://192.168.1.198:8080/laravel/public/';
  ServiceURL = this.rooturi + 'index.php/api/';
  CurrentURL: string;

  LoginURL = 'login';
  clientsdepartment = '';
  profile: any = {};
  PF: any = {};
  mp: any = {};
  private selectedNodes = [];
  nodetype: string;
  public NodeType = {
    internaldatabase: 'internaldatabase',
    history: 'history',
    myjob: 'myjob',
  };
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {

  }
  setProfile(): any {


    this.list('profile/', null, ((response): void => {

      if (response.is_ats === '0') {
        this.clientsdepartment = 'Department';
      }

      this.profile = response;
      this.profile.profilepic = this.rooturi + 'profile/' + this.profile.profilepic;
      this.PF = response;
      document.title = 'PR : ' + this.profile.application;

    }));


    this.list('mypermission/', null, ((response): void => {

      const data = response;
      this.mp = {};
      if (data !== null) {
        for (const i in data) {
          this.mp[data[i].slug] = true;
        }
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
  addmessageandremove(message): void {
    this.showNotification(message);
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
  public showNotification(message, from?, align?) {
    if (from == null || from === undefined) {
      from = 'top';
    }
    if (align == null || align === undefined) {
      align = 'right';
    }
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = 4;// Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: 'notifications',
      message: message

    }, {
        type: type[color],
        timer: 3000,
        placement: {
          from: from,
          align: align
        },
        template: '<div style="z-index:9999;" data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }
  public showMessage(message: any, action?: string, durationMS?: number): void {


    if (isObject(message) && message.status === 0) {
      message = 'Please check your internet.';
    } else if (isObject(message) && message.status === 401) {
      message = 'Please authenticate to access secured resource.';
    } else if (isObject(message) && message.status === 422) {
      message = message.error;
      const messages = [];
      for (const k in message) {
        this.showNotification(message[k]);
        //messages.push(message[k].toString());

      }
      message = "Please Fill values";


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
    const body = new FormData();

    for (const i in data) {
      if (data[i]) {
        body.append(i, data[i]);
      }
    }
    return this.http.post(req.url, body, { headers: headersfull })
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
          if (response.status === 401 || response.status === 422 || (response.hasOwnProperty('error') && response.error === 'token_not_provided')) {
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
      fullurl = this.ServiceURL + url + '?token=' + this.getToken();
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
    const body = new FormData();

    for (const i in data) {
      body.append(i, data[i]);
    }
    return this.http.post(req.url, body, { headers: headersfull })
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
      fullurl = this.ServiceURL + url + 'update/' + id + '?token=' + this.getToken();
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
    const body = new FormData();

    for (const i in data) {
      body.append(i, data[i]);
    }

    return this.http.post(req.url, body, { headers: headersfull })
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
      fullurl = this.ServiceURL + url + 'delete/' + id + '?token=' + this.getToken();
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
    const body = new FormData();

    for (const i in data) {
      body.append(i, data[i]);
    }

    return this.http.post(req.url, body, { headers: headersfull })
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


  downloadFile(data: any, name?: string) {
    debugger;
    if (name === null || name === undefined) {
      name = 'data';
    }
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = name + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  getIDs(nodetype?, id?): any {
    debugger;
    if (id === null || id === undefined) {
      id = 'id';
    }
    const ids = [];
    if (nodetype === this.nodetype) {
      for (const i in this.selectedNodes) {
        if (this.selectedNodes[i]) {
          ids.push(this.selectedNodes[i].data[id]);
        }
      }
    }
    return ids;

  }

  setSelectedNodes(data?, type?): void {
    this.nodetype = type;
    this.selectedNodes = data;

  }
  setSelectedNodeType(type?): void {
    this.nodetype = type;


  }
  getSelectedNodes(type?): any {
    if (type === this.nodetype) {
      return this.selectedNodes;

    } else {
      return [];
    }

  }

  public customCellRendererFunc(params): string {
    let cellContent = '';
    debugger;
    try {

      const id: string = params.value;




      cellContent = '<button (click)="edit(' + id + ')">Edit</button>';

    } catch (exception) {

      console.error(exception);
    }

    return cellContent
  }



}
