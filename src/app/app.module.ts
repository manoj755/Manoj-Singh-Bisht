import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatMenuModule, MatSlideToggleModule, MatCheckboxModule, MatSliderModule, MatSelectModule, MatRadioModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';

import {InternalDatabaseComponent } from './internal-database/internal-database.component';
import { HistoryComponent } from './history/history.component';
import { NewJobComponent } from './new-job/new-job.component';
import { MyJobComponent } from './my-job/my-job.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'myjob', component: MyJobComponent },
  { path: 'newjob', component: NewJobComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'internaldatabase',      component: InternalDatabaseComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashborad' }
  },
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HistoryComponent,
    NewJobComponent,
    MyJobComponent,
    PageNotFoundComponent,
    InternalDatabaseComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
     FlexLayoutModule,
     RouterModule,
     MatSidenavModule,
     FormsModule,
     MatListModule,
     MatIconModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
