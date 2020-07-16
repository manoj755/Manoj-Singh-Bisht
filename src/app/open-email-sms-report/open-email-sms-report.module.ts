import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccumulationChartModule, AccumulationLegendService } from '@syncfusion/ej2-angular-charts';
import { ChartModule } from '@syncfusion/ej2-angular-charts';

import { PieSeriesService,FunnelSeriesService, AccumulationTooltipService, CategoryService, AccumulationDataLabelService } 
from '@syncfusion/ej2-angular-charts';

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
import { ComponentsModule } from '../components/components.module';
import { OpenEmailSmsReportRoutes } from './open-email-sms-report.routes';
import { OpenEmailSmsReportComponent } from './open-email-sms-report.component';
import { from } from 'rxjs';



@NgModule({
  declarations: [
    OpenEmailSmsReportComponent,
  ],
  imports: [
    RouterModule.forChild(OpenEmailSmsReportRoutes), CommonModule, FormsModule, ComponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatCheckboxModule, OwlDateTimeModule, OwlNativeDateTimeModule, MatIconModule,
    MatButtonToggleModule, MatDatepickerModule, AgGridModule,AccumulationChartModule,ChartModule
    // AgGridModule.withComponents([

    //   ,
    // ]),
  ],

  exports: [OpenEmailSmsReportComponent],
  providers: [PieSeriesService,FunnelSeriesService, AccumulationTooltipService, CategoryService, AccumulationDataLabelService,AccumulationLegendService ]

  //schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenEmailSmsReportModule {

}
