import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
//import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
//import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';

import { LoginComponent } from '../../login/login.component';
import { LogoutComponent } from '../../logout/logout.component';
//import { ViewCandidateComponent } from '../../view-candidate/view-candidate.component';


import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OrderModule } from 'ngx-order-pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';

// tslint:disable-next-line: max-line-length
import { GridComponent } from '../../grid/grid.component';
//import { CandidateCallDatailsComponent } from '../../control/candidate-call-datails/candidate-call-datails.component';

import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatCardModule,
 // MatBadgeModule,
  MatDatepickerModule,
  MatListModule,

} from '@angular/material';

declare var $: any;

@NgModule({
  exports: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatCardModule,
    NgSelectModule,
    MatDatepickerModule,
    //NgxPaginationModule,
    AgGridModule.withComponents([

      //CandidateInJobsNotificationComponent,
      //CandidateCallDatailsComponent,
    ]),
    //OrderModule,
    //MatBadgeModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    //OwlDateTimeModule,
    //OwlNativeDateTimeModule,


  ],
  declarations: [
    DashboardComponent,
    LoginComponent,
    GridComponent,
    //ViewCandidateComponent,
   // CandidateInJobsNotificationComponent,
   // CandidateCallDatailsComponent,
    LogoutComponent,
  ]
})
export class AdminLayoutModule { }
