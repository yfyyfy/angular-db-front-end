import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoolStringPipe } from './bool-string.pipe';
import { EmptyStringPipe } from './empty-string.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BoolStringPipe,
    EmptyStringPipe,
  ],
  exports: [
    BoolStringPipe,
    EmptyStringPipe,
    CommonModule,
  ]
})
export class PipesModule { }
