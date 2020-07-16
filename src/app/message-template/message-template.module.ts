import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
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
import { MessageTemplateComponent } from 'app/message-template/message-template.component';
import { MessageTemplateRoutes } from './message-template.routes';
import { ReportscomponentsModule } from '../components/reportscomponents.module';



@NgModule({
  declarations: [
    MessageTemplateComponent,
  ],
  imports: [
    CKEditorModule,
    RouterModule.forChild(MessageTemplateRoutes), CommonModule, FormsModule, ReportscomponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatRippleModule, MatTooltipModule, MatCheckboxModule, MatProgressBarModule, MatCardModule, MatRadioModule,
    MatButtonToggleModule, MatTabsModule,  MatDatepickerModule,

    AgGridModule.withComponents([

    ]),
  ],

  exports: [MessageTemplateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MessageTemplateModule {

}
