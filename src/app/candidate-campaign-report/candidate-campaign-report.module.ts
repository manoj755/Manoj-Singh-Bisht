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
import { CandidateCampaignReportRoutes } from './candidate-campaign-report.routes';
import { ComponentsModule } from '../components/components.module';
import { CandidateCampaignReportComponent } from './candidate-campaign-report.component';



@NgModule({
  declarations: [
    CandidateCampaignReportComponent,
  ],
  imports: [
    RouterModule.forChild(CandidateCampaignReportRoutes), CommonModule, FormsModule, ComponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatCheckboxModule, OwlDateTimeModule, OwlNativeDateTimeModule, MatIconModule,
    MatButtonToggleModule, MatDatepickerModule, AgGridModule,AccumulationChartModule,ChartModule
    // AgGridModule.withComponents([

    //   ,
    // ]),
  ],

  exports: [CandidateCampaignReportComponent],
  providers: [PieSeriesService,FunnelSeriesService, AccumulationTooltipService, CategoryService, AccumulationDataLabelService,AccumulationLegendService ]

  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CandidateCampaignReportModule {

}
