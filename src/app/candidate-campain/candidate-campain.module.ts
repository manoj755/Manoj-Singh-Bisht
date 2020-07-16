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
import { CandidateCampainComponent } from 'app/candidate-campain/candidate-campain.component';
import { CandidateCampaignViewComponent } from '../control/candidate-campaign-view/candidate-campaign-view.component';
import { CandidateCampainRoutes } from './candidate-campain.routes';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    CandidateCampainComponent, CandidateCampaignViewComponent
  ],
  imports: [
    RouterModule.forChild(CandidateCampainRoutes), CommonModule, FormsModule, ComponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatCheckboxModule, OwlDateTimeModule, OwlNativeDateTimeModule, MatIconModule,
    MatButtonToggleModule, MatDatepickerModule,
    AgGridModule.withComponents([

      CandidateCampaignViewComponent
    ]),
  ],

  exports: [CandidateCampainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CandidateCampainModule {

}
