import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {

  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatTabsModule,


} from '@angular/material';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ComponentsModule } from '../components/components.module';
import { ViewCandidateRoutes } from './view-candidate.routes';
import { ViewCandidateComponent } from './view-candidate.component';



@NgModule({
  declarations: [
    ViewCandidateComponent,
  ],
  imports: [
    RouterModule.forChild(ViewCandidateRoutes), CommonModule, FormsModule, ComponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatCheckboxModule, OwlDateTimeModule, OwlNativeDateTimeModule, MatTabsModule,
    MatButtonToggleModule, MatDatepickerModule, AgGridModule
    // AgGridModule.withComponents([

    //   ,
    // ]),
  ],

  exports: [ViewCandidateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewCandidateModule {

}
