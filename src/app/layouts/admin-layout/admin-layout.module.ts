import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import {ReactiveFormsModule} from 'angular/forms';

// import { AngularSlickgridModule } from 'angular-slickgrid';
// import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginComponent } from '../../login/login.component';
import { LogoutComponent } from '../../logout/logout.component';
import { MyJobComponent } from '../../my-job/my-job.component';
import { BillingComponent } from '../../billing/billing.component';
import { HistoryComponent } from '../../history/history.component';
import { InternalDatabaseComponent } from '../../internal-database/internal-database.component';
import { NewJobComponent } from '../../new-job/new-job.component';
import { DepartmentComponent } from '../../department/department.component';
import { CallDetailComponent } from '../../call-detail/call-detail.component';
import { MessageTemplateComponent } from '../../message-template/message-template.component';
import { ClientComponent } from '../../client/client.component';
import { AddNewTrackerComponent } from '../../add-new-tracker/add-new-tracker.component';
import { TrackerFieldsComponent } from '../../tracker-fields/tracker-fields.component';
import { UsersComponent } from '../../users/users.component';
import { ChannelComponent } from '../../channel/channel.component';
import { EmployeeemailComponent } from '../../employeeemail/employeeemail.component';
import { ClientreportComponent } from '../../clientreport/clientreport.component';
import { ClientReportFullComponent } from '../../client-report-full/client-report-full.component';
import { RecruiterReportNewhistoryComponent } from '../../recruiter-report-newhistory/recruiter-report-newhistory.component';
import { JobwiseComponent } from '../../jobwise/jobwise.component';
import { RecruiterreportnewComponent } from '../../recruiterreportnew/recruiterreportnew.component';
import { SmtpdetailsComponent } from '../../smtpdetails/smtpdetails.component';
import { CandidatestatusupdateComponent } from '../../candidatestatusupdate/candidatestatusupdate.component';
import { OpeningclientwiseComponent } from '../../openingclientwise/openingclientwise.component';
import { MessagelogComponent } from '../../messagelog/messagelog.component';
import { SmslogComponent } from '../../smslog/smslog.component';
import { TermsAndConditionsComponent } from '../../terms-and-conditions/terms-and-conditions.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ManagerComponent } from '../../control/manager/manager.component';
import { AddToJobComponent } from '../../control/add-to-job/add-to-job.component';
import { AddCandidateComponent } from '../../control/add-candidate/add-candidate.component';
import { MyTeamComponent } from '../../control/my-team/my-team.component';
import { PvGetReferenceComponent } from '../../control/pv-get-reference/pv-get-reference.component';
import { CallComponent } from '../../control/call/call.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OrderModule } from 'ngx-order-pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
// import { PipesModule } from 'w-ng5';
import { CandidateMyJobComponent } from '../../control/candidate-my-job/candidate-my-job.component';
import { CandidateCallDatailsComponent } from '../../control/candidate-call-datails/candidate-call-datails.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatCardModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatBadgeModule,
  MatDatepickerModule,
  MatListModule,
  // MatIconRegistry,
  //MatDialog


} from '@angular/material';

import { AddNoteComponent } from '../../control/add-note/add-note.component';
import { UpdateStatusComponent } from '../../control/update-status/update-status.component';
import { ActivityComponent } from '../../control/activity/activity.component';
import { UpdateCandidateComponent } from '../../control/update-candidate/update-candidate.component';

import { NotfoundComponent } from '../../notfound/notfound.component';

import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { SettingsComponent } from '../../settings/settings.component';
import { MyFilterPipe } from '../../shared/pipes/my-filter.pipe';
import { FilterPipe } from '../../shared/pipes/FilterPipe.pipe';
import { SafePipe } from '../../shared/pipes/safe.pipe';



declare var $: any;

// @dynamic
@NgModule({
  exports: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatCardModule,
    MatRadioModule,
    CKEditorModule,
    // TooltipModule.forRoot(),
    MatAutocompleteModule,
    NgSelectModule,
    MatTabsModule,
    MatDatepickerModule,
    NgxPaginationModule,
    // NgxEditorModule,
    // PipesModule,
    //Ng2SearchPipeModule,
    AgGridModule.withComponents([

      CandidateMyJobComponent,
      CandidateCallDatailsComponent,
    ]),
    OrderModule,
    MatBadgeModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,

    // TranslateService,
    //  NgSelectModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginComponent,
    HistoryComponent,
    MyJobComponent,
    BillingComponent,
    InternalDatabaseComponent,
    NewJobComponent,
    CallDetailComponent,
    MessageTemplateComponent,
    ClientComponent,
    AddNewTrackerComponent,
    TrackerFieldsComponent,
    UsersComponent,
    ChannelComponent,
    ManagerComponent,
    AddToJobComponent,
    AddNoteComponent,
    UpdateStatusComponent,
    ActivityComponent,
    AddCandidateComponent,
    MyTeamComponent,
    PvGetReferenceComponent,
    CallComponent,
    DepartmentComponent,
    EmployeeemailComponent,
    ClientreportComponent,
    ClientReportFullComponent,
    JobwiseComponent,
    RecruiterReportNewhistoryComponent,
    RecruiterreportnewComponent,
    OpeningclientwiseComponent,
    CandidateMyJobComponent,
    CandidateCallDatailsComponent,
    TermsAndConditionsComponent,

    PageNotFoundComponent,
    SettingsComponent,
    UpdateCandidateComponent,
    SmtpdetailsComponent,
    CandidatestatusupdateComponent,
    MessagelogComponent,
    SmslogComponent,
    LogoutComponent,
    MyFilterPipe,
    FilterPipe,
    SafePipe,

  ]
})
export class AdminLayoutModule { }
