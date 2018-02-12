import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoolStringPipe } from './bool-string.pipe';
import { EmptyStringPipe } from './empty-string.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BoolStringPipe, EmptyStringPipe]
})
export class PipesModule { }
