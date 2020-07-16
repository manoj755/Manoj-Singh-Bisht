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
  //fp: any;
  isemail: any;
  hidebutton = false;


  loginData = {
    username: '',
    password: '', remember: false
  };
  fp = {
    emailormobile: '',
    isemail: ''

  }
  showSpinner = false;
  resetpassword = {
    otp: '',
    newpassword: '',
    confirmpassword: '',
    emailormobile: ''
  };
  otp = {
    otp: ''
  };
  constructor(private router: Router, public db: DBService) {

  }


  login(): void {
    if (!$('.validate').validate('#loginform')) {
      //  $.fn.showMessage('Please fill values');
      return;
    }




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

  onKeydown(event): void {
    if (event.keyCode == 13) {
      this.login();
    }

  }
  ForgetPassword(): void {
    //const isemail('') = ' ';
    //const data = {
    debugger;
    // if (this.isemail(this.fp.emailormobile)) {
    //   this.fp.isemail = '1';
    // } else {
    //   this.fp.isemail = '0';
    // }
   // if (this.fp.emailormobile == this.loginData.username) {
      const data = {
        email: this.loginData.username, password: this.loginData.password,
        remember: this.loginData.remember, isemail: 1, emailormobile: this.fp.emailormobile
      };

      this.db.post('forgetpasswordats/', data, ((response): void => {

        $('#myStaticDialog').modal('hide');
        $('#otp').modal('show');
        // this.db.setToken(response.token);

        // $('#mdDialog').show({
        //   contentElement: '#otp',
        //   // parent: angular.element(document.body),
        //   fullscreen: true,
        //   disableParentScroll: false
        // })
      })

      );
   // }
  }





  //   myStaticDialog(): {

  //     $mdDialog.show({
  //     contentElement: '#myStaticDialog',
  //     parent: angular.element(document.body),
  //       fullscreen: true,
  //         disableParentScroll: false
  //     });
  // };
  checkotp(): void {
    debugger;
    // this.otp.emailormobile = this.fp.emailormobile;
    const data = { otp: this.otp.otp, emailormobile: this.fp.emailormobile };

    // var req = {
    //   method: 'POST',
    //   url: ServiceURL + 'checkotp/',
    //   data: $.param($scope.otp)
    //   ,
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    // }
    this.db.post('checkotp/', data, (response): void => {
      this.db.addmessageandremove('otp submitted');
      $('#otp').modal('hide');
      $('#changepassword').modal('show');

    });

  };
  changepasswordFN(): void {
debugger;
    if (this.resetpassword.newpassword.length >= 6 && this.resetpassword.confirmpassword == this.resetpassword.newpassword) {
      // this.resetpassword.emailormobile = this.fp.emailormobile;
      this.resetpassword.otp = this.otp.otp;


      // var req = {
      //   method: 'POST',
      //   url: ServiceURL + 'resetpasswordmobile/',
      //   data: $.param($scope.resetpassword)
      //   ,
      //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      // }
      const data = {
        emailormobile: this.fp.emailormobile,
        otp: this.resetpassword.otp, newpassword: this.resetpassword.newpassword
      };

      this.db.post('resetpasswordmobile/', data, (response): void => {
        //$('#otp').modal('hide');
        $('#changepassword').modal('hide');
        this.db.addmessageandremove('password changed');

      });
      // $http(req).then(function (response) {
      //   alert('changed successfully');
      //   this.cancel();
      // }, function (r) {
      //   if (r.data.msg != null) {
      //     alert(r.data.msg);
      //   }
      // });
    } else if (this.resetpassword.confirmpassword ! = this.resetpassword.newpassword) {
      alert('password not matched');
    } else if (this.resetpassword.newpassword.length < 6) {
      alert('password length must be at least 6');
    }
  };
  // $scope.cancel = function () {
  //   $mdDialog.hide();
  // };

  ngOnInit() {
    $('.sidebar').hide();
    $('.main-panel').css('width', '100%');
    $('app-navbar').remove();
    this.islogin = true;

  }
  ngOnDestroy(): void {


  }

}
