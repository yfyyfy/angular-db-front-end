import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { PipesModule }               from './pipes/pipes.module';

import { CheckboxOneditComponent }   from './checkbox-onedit/checkbox-onedit.component';
import { InputOneditComponent }      from './input-onedit/input-onedit.component';
import { MultiCheckboxComponent }    from './multi-checkbox/multi-checkbox.component';
import { MultiInputOneditComponent } from './multi-input-onedit/multi-input-onedit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NguiAutoCompleteModule,
    PipesModule
  ],
  declarations: [
    CheckboxOneditComponent,
    InputOneditComponent,
    MultiCheckboxComponent,
    MultiInputOneditComponent,
  ],
  exports: [
    CheckboxOneditComponent,
    InputOneditComponent,
    MultiCheckboxComponent,
    MultiInputOneditComponent,
    CommonModule,
    FormsModule,
    PipesModule,
  ],
})
export class SharedModule { }
