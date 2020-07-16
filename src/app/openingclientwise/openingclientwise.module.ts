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
import { OpeningclientwiseComponent } from 'app/openingclientwise/openingclientwise.component';
import { OpeningclientwiseRoutes } from './openingclientwise.routes';
import { ReportscomponentsModule } from '../components/reportscomponents.module';



@NgModule({
  declarations: [
    OpeningclientwiseComponent,
  ],
  imports: [
    RouterModule.forChild(OpeningclientwiseRoutes), CommonModule, FormsModule, ReportscomponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatRippleModule, MatTooltipModule, MatCheckboxModule, MatProgressBarModule, MatCardModule, MatRadioModule,
    MatButtonToggleModule, MatTabsModule,  MatDatepickerModule,

    AgGridModule.withComponents([

    ]),
  ],

  exports: [OpeningclientwiseComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpeningclientwiseModule {

}
