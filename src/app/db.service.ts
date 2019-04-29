import { Injectable, OnInit, } from '@angular/core';
// import { type } from 'os';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { isArray, isObject } from 'util';
import { LargeTextCellEditor } from 'ag-grid-community';
import { json } from 'd3';
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
  loaderprogressbar = false;
  profile: any = {};
  PF: any = {};
  globaljobid = 0;
  mp: any = {};
  private selectedNodes = [];
  nodetype: string;
  public NodeType = {
    internaldatabase: 'internaldatabase',
    history: 'history',
    myjob: 'myjob',
  };
  http_or_https = 'http';
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    this.setProfile();
    this.globaljobid = 0;
    if (window.location.href.indexOf('https') !== -1) {
      this.http_or_https = 'https';
    }
  }
  setProfile(): any {

    if (!this.profile.profilepic) {
      this.list('profile/', null, ((response): void => {

        if (response.is_ats === '0') {
          this.clientsdepartment = 'Department';
        } else {
          this.clientsdepartment = 'Client';
        }

        this.profile = response;
        this.profile.profilepic = this.rooturi + 'profile/' + this.profile.profilepic;
        this.PF = response;
        document.title = 'PR : ' + this.profile.application;

      }));
    }

    if (!this.mp.mploaded) {
      this.list('mypermission/', null, ((response): void => {

        const data = response;
        this.mp = { mploaded: true };
        if (data !== null) {
          for (const i in data) {
            if (data[i]) {
              this.mp[data[i].slug] = true;
            }
          }
        }
      }));
      this.mp.mploaded = false;
    }
  }
  ngOnInit() {
    //  this.setProfile();
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
  public showNotification(message, timer?, from?, align?) {
    if (timer == null || timer === undefined) {
      timer = 3000;
    }
    if (from == null || from === undefined) {
      from = 'top';
    }
    if (align == null || align === undefined) {
      align = 'right';
    }
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = 4; // Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: 'notifications',
      message: message

    }, {
        type: type[color],
        timer: timer,
        placement: {
          from: from,
          align: align
        },
        template: '<div style="z-index:99999!important;" data-notify="container" ' +
          'class="col-xl-4 col-lg-4 col-11 zindex col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" ' +
          ' data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">' + message + '</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" ' +
          'aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }
  public showDialog(messsage, title?) {
    if (title === null || title === undefined) {
      title = 'Message';
    }
    $('#messagepopup').modal('show');
    $('#messagetitle').html(title);
    $('#messagebody').html(messsage);
  }
  public showMessage(message: any, action?: string, durationMS?: number): void {


    if (isObject(message) && message.status === 0) {
      message = 'Please check your internet.';
    } else if (isObject(message) && message.error && message.error.msg) {
      message = message.error.msg;
      this.showNotification(message);
    } else if (isObject(message) && message.status === 401) {
      message = 'Please authenticate to access secured resource.';
    } else if (isObject(message) && message.status >= 500) {
      message = 'Error Occured';
    } else if (isObject(message) && message.status === 422) {
      message = message.error;
      const messages = [];
      for (const k in message) {
        if (message[k]) {
          this.showNotification(message[k]);
        }
        // messages.push(message[k].toString());

      }
      message = 'Please Fill values';


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
    //
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
    this.loaderprogressbar = true;
  }
  hideLoaderfunction(loader): void {
    setTimeout(() => {
      this.loaderprogressbar = false;
    }, 1000);
  }



  buildFormData(formData, data, parentKey?) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {

      let value = data == null ? '' : data;
      if (typeof data === 'string') {
        value = value.replace(/['"]+/g, '');
      }
      formData.append(parentKey, value);
    }
  }

  jsonToFormData(data) {
    const formData = new FormData();

    this.buildFormData(formData, data);

    return formData;
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
    this.http.post(req.url, body, { headers: headersfull })
      .subscribe(
        res => {
          this.hideLoaderfunction(loader);
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

    this.http.get(req.url, { headers: headersfull, params: data })
      .subscribe(
        res => {
          this.hideLoaderfunction(loader);
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

    this.http.get(req.url, { headers: headersfull, params: data })
      .subscribe(
        res => {
          this.hideLoaderfunction(loader);
          if (success !== undefined) {
            success(res);
          }
        },
        response => {
          this.hideLoaderfunction(loader);
          this.showMessage(response);
          if (response.status === 401 || response.status === 422 ||
            (response.hasOwnProperty('error') && response.error === 'token_not_provided')) {
            this.goToLogin(response);
          } else {
            if (fail !== undefined) {

              fail(response);
            }
          }
        }
      );

  }
  storeupload(url: string, data?: any, success?: ICallback, fail?: ICallback, loader?, fileToUpload?: any[]): any {


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
    if (data === undefined || data === null) {
      data = {};
    }
    data.token = this.getToken();
    const headersfull = new HttpHeaders();
    headersfull.append('Content-Type', 'application/x-www-form-urlencoded');
    // post data missing(here you pass email and password)
    let body = new FormData();

    body = this.jsonToFormData(data);
    if (fileToUpload != null) {
      for (const i in fileToUpload) {
        if (fileToUpload[i]) {
          let filekey = 'file';
          if (fileToUpload[i].filekey) {
            filekey = fileToUpload[i].filekey;
          }

          body.append(filekey, fileToUpload[i].file, fileToUpload[i].file.name);
        }

      }
    }
    this.http.post(req.url, body, { headers: headersfull })
      .subscribe(
        res => {
          this.hideLoaderfunction(loader);
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
    let body = new FormData();

    body = this.jsonToFormData(data);
    this.http.post(req.url, body, { headers: headersfull })
      .subscribe(
        res => {
          this.hideLoaderfunction(loader);
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
    headersfull.append('Content-Type', 'application/json');

    // post data missing(here you pass email and password)

    this.http.get(req.url, { headers: headersfull, params: data })
      .subscribe(
        res => {
          this.hideLoaderfunction(loader);
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
    let body = new FormData();

    body = this.jsonToFormData(data);

    this.http.post(req.url, body, { headers: headersfull })
      .subscribe(
        res => {
          this.hideLoaderfunction(loader);
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
    const body = this.ConvertToFormData(data, '', '');

    this.http.post(req.url, body, { headers: headersfull })
      .subscribe(
        res => {
          this.hideLoaderfunction(loader);
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

  ConvertToFormData(obj, form, namespace) {

    const fd = form || new FormData();
    let formKey;

    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {

        if (namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }

        // if the property is an object, but not a File,
        // use recursivity.
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {

          this.ConvertToFormData(obj[property], fd, property);

        } else {

          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }

      }
    }

    return fd;


    /*
        const body = new FormData();

        for (const i in data) {
          if (data[i]) {
            if (!isArray(data[i])) {
              body.append(i, data[i]);
            } else {
              const alldata = data[i];
              let iterator = 0;
              for (const k in alldata) {
                if (alldata[k]) {
                  const currow = alldata[k];
                  for (const keycur in currow) {
                    if (currow[keycur]) {

                      body.append(i + '[' + iterator + '][' + keycur + ']', currow[keycur]);
                    }
                  }
                  iterator++;
                }


              }
            }
          }
        }
        return body;*/
  }

  toYYMMDD(date) {
    let dd = date.getDate();

    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
  }
  toMMDDYY(date) {
    let dd = date.getDate();

    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    return mm + '-' + dd + '-' + yyyy;
  }

  downloadFile(data: any, name?: string) {

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

  extractIDsData(data, id?): any {

    if (id === null || id === undefined) {
      id = 'id';
    }
    const ids = [];

    for (const i in data) {
      if (data[i]) {
        ids.push(data[i].data[id]);
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

    try {

      const id: string = params.value;




      cellContent = '<button (click)="edit(' + id + ')">Edit</button>';

    } catch (exception) {

      console.error(exception);
    }

    return cellContent
  }




  SelectedCheckbox(obj, selected = 'selected', key = 'id'): any {
    const selectedmanager = [];
    for (const i in obj) {
      if (obj[i][selected] === true) {
        selectedmanager.push(obj[i][key]);
      }
    }
    return selectedmanager;
  }
  SelectedCheckboxWithComma(obj, selected = 'selected', key = 'id'): any {
    let selectedcheckbox = '';
    for (const i in obj) {
      if (obj[i][selected] === true) {
        selectedcheckbox += (obj[i][key]) + ',';
      }
    }
    return selectedcheckbox;
  }

  SelectedWithComma(obj, key = 'id'): any {
    let selectedcheckbox = '';
    for (const i in obj) {
      if (obj[i]) {
        selectedcheckbox += (obj[i][key]) + ',';
      }
    }
    return selectedcheckbox.substring(0, selectedcheckbox.lastIndexOf(','));
    // creturn selectedcheckbox;
  }
  SelectedItems(obj, key = 'id'): any {
    const selectedcheckbox = [];
    for (const i in obj) {
      if (obj[i][key]) {
        selectedcheckbox.push(obj[i][key]);
      }
    }
    return selectedcheckbox;
    // return selectedcheckbox;
  }
  SelectedObjects(obj, selected = 'selected'): any {
    const selectedmanager = [];
    for (const i in obj) {
      if (obj[i][selected] === true) {
        selectedmanager.push(obj[i]);
      }
    }
    return selectedmanager;
  }
  GenerateColDef(data): Array<Object> {
    const coldef = [];
    if (data.length > 0) {
      data = data[0];
    }
    for (const col in data) {
      if (data[col]) {
        coldef.push({ headerName: col, field: col, sortable: true, filter: true })
      }
    }
    console.log(JSON.stringify(coldef));
    return coldef;
  }
}
