import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../db.service';
declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  islogin: boolean;
  loginData = {
    username: '',
    password: '', remember: false
  };
  showSpinner = false;
  constructor(private router: Router, public db: DBService) {

  }


  login(): void {

    const data = { email: this.loginData.username, password: this.loginData.password, remember: this.loginData.remember };
    this.showSpinner = true;
    this.db.post('authenticate/?employer=1', data, ((response): void => {
      this.db.setToken(response.token);
      // this.router.navigate(['dashboard']);
      window.location.href = '/';
      this.showSpinner = false;
    }), ((response): void => {
      if (response.data && response.data.msg) {
        this.db.showMessage(response.data.msg);
      } else
        if (response.status === 401 ||
          (response.data === null && response.data.hasOwnProperty('error')
            && response.data.error === 'token_not_provided')) {

          this.db.showMessage('Please enter valid credentials');
        }
      this.showSpinner = false;
    }));

  }
  ngOnInit() {
    $('.sidebar').hide();
    $('.main-panel').css('width', '100%');
    $('app-navbar').remove();
    this.islogin = true;

  }
  ngOnDestroy(): void {


  }

}
