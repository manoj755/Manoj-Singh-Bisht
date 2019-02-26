import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ManagerComponent } from '../../control/manager/manager.component';
import { AddToJobComponent } from '../../control/add-to-job/add-to-job.component';
import { AddCandidateComponent } from '../../control/add-candidate/add-candidate.component';
import { MyTeamComponent } from '../../control/my-team/my-team.component';
import { PvGetReferenceComponent } from '../../control/pv-get-reference/pv-get-reference.component';
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

} from '@angular/material';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
// @dynamic
@NgModule({
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
    AngularSlickgridModule.forRoot({
      // add any Global Grid Options/Config you might want
      // to avoid passing the same options over and over in each grids of your App
      // enableAutoResize: true,
      // autoResize: {
      //   containerId: 'demo-container',
      //   sidePadding: 15
      // },
      // enablePagination: true,
      // pagination: {
      //   pageSize: 10,
      //   pageSizes: [10, 20, 100],
      //   totalItems: 0,
      // }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AgGridModule.withComponents([]),
    // TranslateService,
    NgSelectModule,
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
    AddCandidateComponent,
    MyTeamComponent,
    PvGetReferenceComponent
  ]
})
export class AdminLayoutModule { }
