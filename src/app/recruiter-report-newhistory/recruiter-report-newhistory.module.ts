import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {

  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,



  MatRippleModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatCardModule,
  MatRadioModule,
  // FileUploadModule,
  MatButtonToggleModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatDatepickerModule,
  //NgxPaginationModule,
  //DragDropModule,
  MatChipsModule,


} from '@angular/material';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { RecruiterReportNewhistoryComponent } from 'app/recruiter-report-newhistory/recruiter-report-newhistory.component';
import { RecruiterReportNewhistoryRoutes } from './recruiter-report-newhistory.routes';
import { ReportscomponentsModule } from '../components/reportscomponents.module';



@NgModule({
  declarations: [
    RecruiterReportNewhistoryComponent,
  ],
  imports: [
    RouterModule.forChild(RecruiterReportNewhistoryRoutes), CommonModule, FormsModule, ReportscomponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatRippleModule, MatTooltipModule, MatCheckboxModule, MatProgressBarModule, MatCardModule, MatRadioModule,
    MatButtonToggleModule, MatTabsModule,  MatDatepickerModule,

    AgGridModule.withComponents([

    ]),
  ],

  exports: [RecruiterReportNewhistoryComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecruiterReportNewhistoryModule {

}
