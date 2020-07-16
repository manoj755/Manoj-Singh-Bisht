import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { OrderModule } from 'ngx-order-pipe';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {

  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,


  MatBadgeModule,
  MatRippleModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatCardModule,
  MatRadioModule,
  // FileUploadModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatDatepickerModule,
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MyJobComponent } from 'app/my-job/my-job.component';
import { MyJobRoutes } from './my-job.routes';
import { ComponentsModule } from '../components/components.module';

//import { CallComponent } from '../control/call/call.component';


@NgModule({
  declarations: [
    MyJobComponent,
  ],
  imports: [
    RouterModule.forChild(MyJobRoutes), CommonModule, FormsModule, ComponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatRippleModule, MatTooltipModule, MatCheckboxModule, MatProgressBarModule, MatCardModule, MatRadioModule,
    MatButtonToggleModule, MatTabsModule,MatIconModule, NgxPaginationModule, OrderModule, MatBadgeModule,MatDatepickerModule,
    AgGridModule.withComponents([


    ]),
  ],

  exports: [MyJobComponent,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyJobModule {

}
