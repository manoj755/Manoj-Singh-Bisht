import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
import { TrackerFieldsComponent } from 'app/tracker-fields/tracker-fields.component';
import { TrackerFieldsRoutes } from './tracker-fields.routes';
//import { ReportscomponentsModule } from '../components/reportscomponents.module';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    TrackerFieldsComponent,
  ],
  imports: [
    RouterModule.forChild(TrackerFieldsRoutes), CommonModule, FormsModule, ComponentsModule, DragDropModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatRippleModule, MatTooltipModule, MatCheckboxModule, MatProgressBarModule, MatCardModule, MatRadioModule,
    MatButtonToggleModule, MatTabsModule, MatDatepickerModule,

    AgGridModule.withComponents([

    ]),
  ],

  exports: [TrackerFieldsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackerFieldsModule {

}
