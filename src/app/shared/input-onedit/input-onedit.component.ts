import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const INPUT_ONEDIT_COMPONENT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputOneditComponent),
  multi: true
};

@Component({
  selector: 'app-input-onedit',
  templateUrl: './input-onedit.component.html',
  styleUrls: ['./input-onedit.component.css'],
  providers: [INPUT_ONEDIT_COMPONENT_ACCESSOR]
})
export class InputOneditComponent implements ControlValueAccessor {
  @Input() editMode: boolean;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() source: any[];

  // The internal data model
  private innerValue: any = '';

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // get/set accessor
  get value(): any {
    return this.innerValue;
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // ControlValueAccessor interfaces
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
