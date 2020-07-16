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
import { HistoryComponent } from 'app/history/history.component';
import { HistoryRoutes } from './history.routes';
import { ComponentsModule } from '../components/components.module';
import { MyHistoryCandidateComponent } from '../control/my-history-candidate/my-history-candidate.component';



@NgModule({
  declarations: [
    HistoryComponent,MyHistoryCandidateComponent,
  ],
  imports: [
    RouterModule.forChild(HistoryRoutes), CommonModule, FormsModule, ComponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatCheckboxModule, OwlDateTimeModule, OwlNativeDateTimeModule, MatIconModule,
    MatButtonToggleModule, MatDatepickerModule,
    AgGridModule.withComponents([

      MyHistoryCandidateComponent
    ]),
  ],

  exports: [HistoryComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HistoryModule {

}
