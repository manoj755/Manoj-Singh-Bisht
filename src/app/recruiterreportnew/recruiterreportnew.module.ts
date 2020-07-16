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
import { RecruiterreportnewComponent } from 'app/recruiterreportnew/recruiterreportnew.component';
import { RecruiterreportnewRoutes } from './recruiterreportnew.routes';
import { ReportscomponentsModule } from '../components/reportscomponents.module';



@NgModule({
  declarations: [
    RecruiterreportnewComponent,
  ],
  imports: [
    RouterModule.forChild(RecruiterreportnewRoutes), CommonModule, FormsModule, ReportscomponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatRippleModule, MatTooltipModule, MatCheckboxModule, MatProgressBarModule, MatCardModule, MatRadioModule,
    MatButtonToggleModule, MatTabsModule,  MatDatepickerModule,

    AgGridModule.withComponents([

    ]),
  ],

  exports: [RecruiterreportnewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecruiterreportnewModule {

}
