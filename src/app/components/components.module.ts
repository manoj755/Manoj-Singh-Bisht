import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CallComponent } from '../control/call/call.component';
import { AddToJobComponent } from '../control/add-to-job/add-to-job.component';
import { AddCandidateComponent } from '../control/add-candidate/add-candidate.component';
import { MailerComponent } from '../control/mailer/mailer.component';
import { UpdateCandidateComponent } from '../control/update-candidate/update-candidate.component';
import { SafePipe } from '../shared/pipes/safe.pipe';
import { PvGetReferenceComponent } from '../control/pv-get-reference/pv-get-reference.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MyFilterPipe } from '../shared/pipes/my-filter.pipe';
import { FilterPipe } from '../shared/pipes/FilterPipe.pipe';
import { SortPipe } from '../shared/pipes/sort.pipe';
import { AddNoteComponent } from '../control/add-note/add-note.component';
import { AgGridModule } from 'ag-grid-angular';
import { CandidateMyJobComponent } from '../control/candidate-my-job/candidate-my-job.component';
import { UpdateStatusComponent } from '../control/update-status/update-status.component';
import { ActivityComponent } from '../control/activity/activity.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {

  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule,




} from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CandidateCallDatailsComponent } from '../control/candidate-call-datails/candidate-call-datails.component';





@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    MatSelectModule,
    MatCheckboxModule,

    MatInputModule,
    CKEditorModule, FormsModule,
    AgGridModule.withComponents([

      CandidateMyJobComponent,CandidateCallDatailsComponent
    ]),

  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CallComponent,
    AddToJobComponent,
    AddCandidateComponent,
    MailerComponent,
    UpdateCandidateComponent,
    SafePipe,
    PvGetReferenceComponent,
    MyFilterPipe,
    FilterPipe,
    SortPipe,
    AddNoteComponent,
    UpdateStatusComponent,
    CandidateMyJobComponent,ActivityComponent,CandidateCallDatailsComponent

  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CallComponent,
    AddToJobComponent,
    MailerComponent,
    AddCandidateComponent,
    UpdateCandidateComponent, PvGetReferenceComponent, MyFilterPipe,
    FilterPipe,
    SortPipe,
    AddNoteComponent,UpdateStatusComponent,ActivityComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ComponentsModule { }
