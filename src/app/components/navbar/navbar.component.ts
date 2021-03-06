import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { DBService } from 'app/db.service';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  hidedashboard = false;
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(location: Location, private element: ElementRef, private router: Router, public db: DBService) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      const $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
    this.getTitle();
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  };
  sidebarToggle() {

    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    const $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible === 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove('nav-open');
      const $layer = null;
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      const $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () { // asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;

    }
  };

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(2);
    }
    titlee = titlee.split('/').pop();
    this.db.setSelectedNodeType(titlee);
    titlee = '/' + titlee;
    $('.active').removeClass('active');
    $('[href="' + titlee + '"').parent().addClass('active');
    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {

        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  // $rootScope.lastLength = 0;
  // $rootScope.isToDoForFirstTime = true;
  // $rootScope.notificationload = function () {

  //     db.list('getnotification/', null, function (response) {
  //         $rootScope.notification = response.data;


  //         var counter = 0;
  //         for (var i in response.data)
  //         {
  //             if (response.data[i].difference > 72) {
  //                 counter++;
  //             }
  //         }
  //         if (counter > 0) {
  //             if ($rootScope.isToDoForFirstTime) {
  //                 $rootScope.addmessageandremove('<i class="fa fa-exclamation-triangle text-danger" aria-hidden="true"></i>
  // Tat for reference is 72 hours. ' + counter + ' reference(s) crossed  it.
  // Please take action. ');
  //                 $rootScope.isToDoForFirstTime = false;
  //             } else
  //             {

  //                 var diff = response.data.length - $rootScope.lastLength;
  //                 if (diff > 0) {
  //                  //
  //                     $rootScope.addmessageandremove('<i class="fa fa-exclamation-triangle
  // text-danger" aria-hidden="true"></i> You have '+diff + ' new reference(s) to be screened.');
  //                 }

  //             }
  //         }
  //         this.lastLength = response.data.length;
  //     }, function (response) {
  //     });
  // };


}
