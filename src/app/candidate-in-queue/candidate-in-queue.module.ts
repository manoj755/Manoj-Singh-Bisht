import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {

  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatDatepickerModule


} from '@angular/material';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { CandidateInQueueComponent } from 'app/candidate-in-queue/candidate-in-queue.component';
import { CandidateInQueueRoutes } from './candidate-in-queue.routes';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    CandidateInQueueComponent,
  ],
  imports: [
    RouterModule.forChild(CandidateInQueueRoutes), CommonModule, FormsModule, ComponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatCheckboxModule, OwlDateTimeModule, OwlNativeDateTimeModule, MatIconModule,
    MatButtonToggleModule, MatDatepickerModule, AgGridModule
    // AgGridModule.withComponents([

    //   ,
    // ]),
  ],

  exports: [CandidateInQueueComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CandidateInQueueModule {

}
