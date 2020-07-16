import { Component, OnInit } from '@angular/core';
import { path } from 'd3';
import { DBService } from '../../db.service';
declare const $: any;
declare interface ChildRouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
declare interface RouteInfo {
  path: string;
  href?: string;
  title: string;
  icon: string;
  class: string;
  childpages?: ChildRouteInfo[],
  mainmenu?: boolean;
}
export const ROUTES: RouteInfo[] = [
  {
    path: 'd', href: '#pages', title: 'Login', icon: 'person', class: '', mainmenu: true, childpages: [

      { path: '/login', title: 'Login', icon: 'person', class: '' },
    ]

  },
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/internaldatabase', title: 'Internal Database', icon: 'person', class: '' },
  { path: '/history', title: 'History', icon: 'person', class: '' },
  { path: '/call-detail', title: 'Call Details', icon: 'person', class: '' },
  { path: '/candidate-in-queue', title: 'Candidate in Queue', icon: 'person', class: '' },
  { path: '/candidate-campaign', title: 'Candidate in Campaign', icon: 'person', class: '' },
  { path: '/myjob', title: 'My Job', icon: 'person', class: '' },
  { path: '/newjob', title: 'New Job', icon: 'person', class: '' },
  { path: '/clientreport', title: 'Client Report', icon: 'person', class: '' },
  { path: '/client-report-full', title: 'Client Full Report', icon: 'person', class: '' },
  { path: '/recruiter-report-newhistory', title: 'Recruiter Report New history', icon: 'person', class: '' },
  { path: '/jobwise', title: 'Job Wise', icon: 'person', class: '' },
  { path: '/recruiterreportnew', title: 'Recruiter Report new', icon: 'person', class: '' },
  { path: '/OpeningclientwiseComponent', title: 'Opening Client Wise', icon: 'person', class: '' },
  { path: '/department', title: 'Department', icon: 'person', class: '' },
  { path: '/employeeemail', title: 'Employee Email', icon: 'person', class: '' },
  { path: '/messagetemplate', title: 'Message Template', icon: 'person', class: '' },
  { path: '/client', title: 'Client', icon: 'person', class: '' },
  { path: '/newtracker', title: 'New Tracker', icon: 'person', class: '' },
  { path: '/trackers', title: 'Trackers', icon: 'person', class: '' },
  { path: '/users', title: 'Users', icon: 'person', class: '' },
  { path: '/channel', title: 'Channel', icon: 'person', class: '' },
  { path: '/billing', title: 'Billing', icon: 'person', class: '' },
  { path: '/smtpdetails', title: 'Smtp Details', icon: 'person', class: '' },
  { path: '/candidatestatusupdate', title: 'Candidate Status Update', icon: 'person', class: '' },

  { path: '/messagelog', title: 'Message Log', icon: 'person', class: '' },
  { path: '/smslog', title: 'Sms Log', icon: 'person', class: '' },

  { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
  { path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
  { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  { path: '/login', title: 'Login', icon: 'person', class: '' },
  { path: '/logout', title: 'LogOut', icon: 'person', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public db: DBService) { }

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
