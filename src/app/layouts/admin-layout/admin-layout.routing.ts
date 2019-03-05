import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {  LoginComponent } from '../../login/login.component';
import { MyJobComponent } from '../../my-job/my-job.component';
import { BillingComponent } from '../../billing/billing.component';
import { HistoryComponent } from '../../history/history.component';
import { InternalDatabaseComponent } from '../../internal-database/internal-database.component';
import { NewJobComponent } from '../../new-job/new-job.component';
import { CallDetailComponent } from '../../call-detail/call-detail.component';
import { MessageTemplateComponent } from '../../message-template/message-template.component';
import { ClientComponent } from '../../client/client.component';
import { AddNewTrackerComponent } from '../../add-new-tracker/add-new-tracker.component';
import { TrackerFieldsComponent } from '../../tracker-fields/tracker-fields.component';
import { UsersComponent } from '../../users/users.component';
import { ChannelComponent } from '../../channel/channel.component';
import { DepartmentComponent } from '../../department/department.component';
import { EmployeeemailComponent } from 'app/employeeemail/employeeemail.component';
import { ClientreportComponent } from 'app/clientreport/clientreport.component';
import { ClientReportFullComponent } from 'app/client-report-full/client-report-full.component';
import { JobwiseComponent } from 'app/jobwise/jobwise.component';
import { RecruiterReportNewhistoryComponent } from 'app/recruiter-report-newhistory/recruiter-report-newhistory.component';
import { RecruiterreportnewComponent } from 'app/recruiterreportnew/recruiterreportnew.component';
import { OpeningclientwiseComponent } from 'app/openingclientwise/openingclientwise.component';
import { SmtpdetailsComponent } from 'app/smtpdetails/smtpdetails.component';
import { CandidatestatusupdateComponent } from 'app/candidatestatusupdate/candidatestatusupdate.component';
import { MessagelogComponent } from 'app/messagelog/messagelog.component';
import { SmslogComponent } from 'app/smslog/smslog.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'internaldatabase',        component: InternalDatabaseComponent },
    { path: 'history',        component: HistoryComponent },
    { path: 'calldetail',        component: CallDetailComponent },
    { path: 'myjob',        component: MyJobComponent },
    { path: 'newjob',        component: NewJobComponent },
    { path: 'clientreport',        component: ClientreportComponent },
    { path: 'recruiterreportnew',        component: RecruiterreportnewComponent },
    { path: 'recruiter-report-newhistory',        component: RecruiterReportNewhistoryComponent },
    { path: 'jobwise',        component: JobwiseComponent },
    { path: 'client-report-full',        component: ClientReportFullComponent },
    { path: 'openingclientwise',        component: OpeningclientwiseComponent },
    { path: 'smtpdetails',        component: SmtpdetailsComponent },
    { path: 'candidatestatusupdate',        component: CandidatestatusupdateComponent },
    { path: 'messagetemplate',        component: MessageTemplateComponent },
    { path: 'client',        component: ClientComponent },
    { path: 'newtracker',        component: AddNewTrackerComponent },
    { path: 'trackers',        component: TrackerFieldsComponent },
    { path: 'department',        component: DepartmentComponent },
    { path: 'employeeemail',        component: EmployeeemailComponent },
    { path: 'users',        component: UsersComponent },
    { path: 'channel',        component: ChannelComponent },
    { path: 'billing',        component: BillingComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'login',        component: LoginComponent },
    { path: 'messagelog',        component: MessagelogComponent },
    { path: 'smslog',        component: SmslogComponent },












];
