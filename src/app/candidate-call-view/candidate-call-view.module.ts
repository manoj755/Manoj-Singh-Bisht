import { CommonModule } from '@angular/common';
import { CandidateCallViewComponent } from '../candidate-call-view/candidate-call-view.component';
import { CandidateCallViewRoutes } from './candidate-call-view.routes';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';




import {

  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatBadgeModule


} from '@angular/material';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ComponentsModule } from '../components/components.module';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
    CandidateCallViewComponent,

  ],
  imports: [
    
    RouterModule.forChild(CandidateCallViewRoutes), CommonModule, FormsModule, ComponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatCheckboxModule, OwlDateTimeModule, OwlNativeDateTimeModule,
    MatButtonToggleModule, MatDatepickerModule, AgGridModule, NgxPaginationModule, OrderModule, MatSliderModule,
    MatSlideToggleModule,
    MatBadgeModule,  ],
  exports: [CandidateCallViewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class CandidateCallViewModule { }
