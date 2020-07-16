import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {

  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,




} from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';





@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,

  ],
  declarations: [  ],
  exports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ReportscomponentsModule { }
