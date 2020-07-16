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
import { InternalDatabaseComponent } from 'app/internal-database/internal-database.component';
import { InternalDatabaseRoutes } from './internal-database.routes';
import { ComponentsModule } from '../components/components.module';

import { CandidateInternaldatabaseComponent } from 'app/control/candidate-internadatabase/candidate-internaldatabase.component';
//import { CallComponent } from '../control/call/call.component';


@NgModule({
  declarations: [
    InternalDatabaseComponent, CandidateInternaldatabaseComponent
  ],
  imports: [
    RouterModule.forChild(InternalDatabaseRoutes), CommonModule, FormsModule, ComponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatRippleModule, MatTooltipModule, MatCheckboxModule, MatProgressBarModule, MatCardModule, MatRadioModule,
    MatButtonToggleModule, MatTabsModule,
    AgGridModule.withComponents([

      CandidateInternaldatabaseComponent,
    ]),
  ],

  exports: [InternalDatabaseComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InternalDatabaseModule {

}
