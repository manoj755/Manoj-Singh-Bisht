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
  MatTabsModule,
  MatDatepickerModule,
  //NgxPaginationModule,
  //DragDropModule,
  MatChipsModule,


} from '@angular/material';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { NewJobComponent } from 'app/new-job/new-job.component';
import { NewJobRoutes } from './new-job.routes';
import { ComponentsModule } from '../components/components.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    NewJobComponent
  ],
  imports: [
    RouterModule.forChild(NewJobRoutes), CommonModule, FormsModule, ComponentsModule,
    NgSelectModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatRippleModule, MatTooltipModule, MatCheckboxModule, MatProgressBarModule, MatCardModule, MatRadioModule,
    MatButtonToggleModule, MatTabsModule, CKEditorModule, MatAutocompleteModule, MatChipsModule,
    AgGridModule.withComponents([

      ,
    ]),
  ],

  exports: [NewJobComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewJobModule {

}
