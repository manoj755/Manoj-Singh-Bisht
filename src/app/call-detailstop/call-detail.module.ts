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
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { CallDetailComponent } from 'app/call-detail/call-detail.component';
import { CallDetailRoutes } from './call-detail.routes';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    CallDetailComponent,
  ],
  imports: [
    RouterModule.forChild(CallDetailRoutes), CommonModule, FormsModule, ComponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatCheckboxModule, OwlDateTimeModule, OwlNativeDateTimeModule,
    MatButtonToggleModule, MatDatepickerModule, AgGridModule, NgxPaginationModule, OrderModule,
    MatBadgeModule,
    // AgGridModule.withComponents([

    //   ,
    // ]),
  ],

  exports: [CallDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CallDetailModule {

}
