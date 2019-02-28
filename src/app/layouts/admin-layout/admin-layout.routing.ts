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
export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'login',        component: LoginComponent },
    { path: 'myjob',        component: MyJobComponent },
    { path: 'billing',        component: BillingComponent },
    { path: 'history',        component: HistoryComponent },
    { path: 'internaldatabase',        component: InternalDatabaseComponent },
    { path: 'newjob',        component: NewJobComponent },
    { path: 'calldetail',        component: CallDetailComponent },
    { path: 'messagetemplate',        component: MessageTemplateComponent },
    { path: 'client',        component: ClientComponent },
    { path: 'newtracker',        component: AddNewTrackerComponent },
    { path: 'trackers',        component: TrackerFieldsComponent },
    { path: 'users',        component: UsersComponent },
    { path: 'channel',        component: ChannelComponent },

];
