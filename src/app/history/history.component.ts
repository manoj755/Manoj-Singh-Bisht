import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AngularGridInstance,
  AngularUtilService,
  Column,
  Editors,
  FieldType,
  Filters,
  Formatters,
  GridOption,
  OnEventArgs,
} from 'angular-slickgrid';
import { DBService } from 'app/db.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  dataset: any[] = [];
  clients: any = [];
  addtojob: any = {};
  sendemailmodel: any = {};
  copycandidate: any = {};
  myjob: any = {};
  sms: any = {};
  addnewjob: any = {};
  profile: any = {};
  store: any = {};
  emailselected: any = {};
  smsselected: any = {};
  title = 'Example 1: Basic Grid';
  subTitle = `
    Basic Grid with fixed sizes (800 x 400) set by "gridHeight" &amp; "gridWidth"
    <ul>
      <li><a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/HOWTO---Step-by-Step" target="_blank">Wiki HOWTO link</a></li>
    </ul>
  `;

  columnDefinitions1: Column[];
  columnDefinitions2: Column[];
  gridOptions1: GridOption;
  gridOptions2: GridOption;
  dataset1: any[];
  dataset2: any[];
  constructor(private db: DBService) { }

  ngOnInit(): void {


  }

}
