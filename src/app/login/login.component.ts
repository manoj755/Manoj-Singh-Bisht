import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../db.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  islogin: boolean;
  constructor(private router: Router, private db: DBService) {

  }
  username = '';
  password = '';
  remember = false;
  showSpinner = false;
  login(): void {
    const data = { email: this.username, password: this.password, remember: this.remember };
    this.showSpinner = true;
    this.db.post('authenticate/?employer=1', data, ((response): void => {
      this.db.setToken(response.token);
      this.router.navigate(['dashboard']);
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
    this.islogin = true;

  }
  ngOnDestroy(): void {
    this.islogin = false;

  }

}
