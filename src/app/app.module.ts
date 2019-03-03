import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { AngularSlickgridModule } from 'angular-slickgrid';


import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { LoginComponent } from './login/login.component';

import {
  MatButtonModule, MatCardModule, MatIconModule, MatSidenavModule, MatListModule,
  MatToolbarModule, MatMenuModule, MatSlideToggleModule, MatCheckboxModule,
  MatSliderModule, MatSelectModule, MatRadioModule, MatInputModule, MatDatepickerModule,
  MatFormFieldModule, MatNativeDateModule,
  MatDialogModule, MatProgressSpinnerModule,
  MatSnackBarModule,
} from '@angular/material';
import {
  AgmCoreModule
} from '@agm/core';
//import { MaterialModule } from '@angular/material';
//import { DatePickerModule } from 'angular-material-datepicker';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HistoryComponent } from './history/history.component';
import { MyJobComponent } from './my-job/my-job.component';
import { BillingComponent } from './billing/billing.component';
import { InternalDatabaseComponent } from './internal-database/internal-database.component';
import { NewJobComponent } from './new-job/new-job.component';
import { CallDetailComponent } from './call-detail/call-detail.component';
import { MessageTemplateComponent } from './message-template/message-template.component';
import { ClientComponent } from './client/client.component';
import { AddNewTrackerComponent } from './add-new-tracker/add-new-tracker.component';
import { TrackerFieldsComponent } from './tracker-fields/tracker-fields.component';
import { UsersComponent } from './users/users.component';
import { ChannelComponent } from './channel/channel.component';
import { AddToJobComponent } from './control/add-to-job/add-to-job.component';
import { MyTeamComponent } from './control/my-team/my-team.component';
import { AddCandidateComponent } from './control/add-candidate/add-candidate.component';
import { PvGetReferenceComponent } from './control/pv-get-reference/pv-get-reference.component';
import { DepartmentComponent } from './department/department.component';
import { SmtpdetailsComponent } from './smtpdetails/smtpdetails.component';
import { EmployeeemailComponent } from './employeeemail/employeeemail.component';
import { ClientreportComponent } from './clientreport/clientreport.component';
import { RecruiterreportnewComponent } from './recruiterreportnew/recruiterreportnew.component';
import { RecruiterReportNewhistoryComponent } from './recruiter-report-newhistory/recruiter-report-newhistory.component';
import { JobwiseComponent } from './jobwise/jobwise.component';
import { ClientReportFullComponent } from './client-report-full/client-report-full.component';
import { OpeningclientwiseComponent } from './openingclientwise/openingclientwise.component';
import { CandidateMyJobComponent } from './control/candidate-my-job/candidate-my-job.component';


import { AddNoteComponent } from './control/add-note/add-note.component';
import { UpdateStatusComponent } from './control/update-status/update-status.component';
import { ActivityComponent } from './control/activity/activity.component';


@NgModule({
  imports: [
    //MaterialModule.forRoot(),
    //DatePickerModule,

    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule,
    MatSidenavModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatSnackBarModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),


  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,





  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
