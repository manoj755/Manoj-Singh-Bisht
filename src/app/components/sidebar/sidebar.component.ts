import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/internaldatabase', title: 'Internal Database', icon: 'person', class: '' },
  { path: '/history', title: 'History', icon: 'person', class: '' },
  { path: '/calldetail', title: 'Call Detail', icon: 'person', class: '' },
  { path: '/myjob', title: 'My Job', icon: 'person', class: '' },
  { path: '/newjob', title: 'New Job', icon: 'person', class: '' },
  { path: '/messagetemplate', title: 'Message Template', icon: 'person', class: '' },
  { path: '/client', title: 'Client', icon: 'person', class: '' },
  { path: '/newtracker', title: 'New Tracker', icon: 'person', class: '' },
  { path: '/trackers', title: 'Trackers', icon: 'person', class: '' },
  { path: '/users', title: 'Users', icon: 'person', class: '' },
  { path: '/channel', title: 'Channel', icon: 'person', class: '' },
  { path: '/billing', title: 'Billing', icon: 'person', class: '' },
  { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
  { path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
  { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  { path: '/login', title: 'Login', icon: 'person', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
