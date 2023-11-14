import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUiModule } from './material-ui/material-ui.module';

@NgModule({
  exports: [
    CommonModule,
    MaterialUiModule,
  ],
  imports: [
    MaterialUiModule,
  ]
})
export class SharedModule { }
