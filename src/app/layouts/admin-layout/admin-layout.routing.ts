import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LoginComponent } from '../../login/login.component';
import { LogoutComponent } from 'app/logout/logout.component';
import { GridComponent } from 'app/grid/grid.component';

export const AdminLayoutRoutes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'grid', component: GridComponent },

  //{ path: 'dashboard', loadChildren: '../../dashboard/dashboard.module#DashboardModule' },

  { path: 'internaldatabase', loadChildren: '../../internal-database/internal-database.module#InternalDatabaseModule' },
  { path: 'history', loadChildren: '../../history/history.module#HistoryModule' },
  { path: 'call-detail', loadChildren: '../../call-detail/call-detail.module#CallDetailModule' },
  { path: 'candidate/:id', loadChildren: '../../view-candidate/view-candidate.module#ViewCandidateModule'},
  { path: 'myjob', loadChildren: '../../my-job/my-job.module#MyJobModule' },
  { path: 'newjob', loadChildren: '../../new-job/new-job.module#NewJobModule' },
  { path: 'editjob/:id', loadChildren: '../../new-job/new-job.module#NewJobModule' },
  { path: 'clientreport', loadChildren: '../../clientreport/clientreport.module#ClientreportModule' },
  { path: 'recruiterreportnew', loadChildren: '../../recruiterreportnew/recruiterreportnew.module#RecruiterreportnewModule' },
  { path: 'recruiter-report-newhistory',
  loadChildren: '../../recruiter-report-newhistory/recruiter-report-newhistory.module#RecruiterReportNewhistoryModule' },
  { path: 'jobwise', loadChildren: '../../jobwise/jobwise.module#JobwiseModule' },
  { path: 'client-report-full', loadChildren: '../../client-report-full/client-report-full.module#ClientReportFullModule' },
  { path: 'openingclientwise', loadChildren: '../../openingclientwise/openingclientwise.module#OpeningclientwiseModule' },
  { path: 'smtpdetails', loadChildren: '../../smtpdetails/smtpdetails.module#SmtpdetailsModule' },
  { path: 'candidatestatusupdate', loadChildren: '../../candidatestatusupdate/candidatestatusupdate.module#CandidatestatusupdateModule' },
  { path: 'messagetemplate', loadChildren: '../../message-template/message-template.module#MessageTemplateModule' },
  { path: 'client', loadChildren: '../../client/client.module#ClientModule' },
  { path: 'newtracker', loadChildren: '../../add-new-tracker/add-new-tracker.module#AddNewTrackerModule' },
  { path: 'trackers', loadChildren: '../../tracker-fields/tracker-fields.module#TrackerFieldsModule' },
  { path: 'department', loadChildren: '../../department/department.module#DepartmentModule' },
  { path: 'employeeemail', loadChildren: '../../employeeemail/employeeemail.module#EmployeeemailModule' },
  { path: 'users', loadChildren: '../../users/users.module#UsersModule' },
  { path: 'channel', loadChildren: '../../channel/channel.module#ChannelModule'},
  { path: 'billing', loadChildren: '../../billing/billing.module#BillingModule' },
  { path: 'user-profile', loadChildren: '../../user-profile/user-profile.module#UserProfileModule' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'clientdepartment', loadChildren: '../../clientdepartment/clientdepartment.module#ClientdepartmentModule' },
  { path: 'candidate-in-queue', loadChildren: '../../candidate-in-queue/candidate-in-queue.module#CandidateInQueueModule' },
  { path: 'candidate-campaign', loadChildren: '../../candidate-campain/candidate-campain.module#CandidateCampainModule' },
  { path: 'candidate-call-report', loadChildren: '../../candidate-call-report/candidate-call-report.module#CandidateCallReportModule' },
  { path: 'candidate-campaign-report', loadChildren: '../../candidate-campaign-report/candidate-campaign-report.module#CandidateCampaignReportModule' },
  { path: 'email-sms-report', loadChildren: '../../open-email-sms-report/open-email-sms-report.module#OpenEmailSmsReportModule' },
  //{ path: 'candidate/:id', component: ViewCandidateComponent},

];
