import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyStringPipe } from './empty-string.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EmptyStringPipe]
})
export class PipesModule { }
