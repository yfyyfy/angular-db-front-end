import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CHECKBOX_ONEDIT_COMPONENT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxOneditComponent),
  multi: true
};

@Component({
  selector: 'app-checkbox-onedit',
  templateUrl: './checkbox-onedit.component.html',
  styleUrls: ['./checkbox-onedit.component.css'],
  providers: [CHECKBOX_ONEDIT_COMPONENT_ACCESSOR]
})
export class CheckboxOneditComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() editMode: boolean;
  @Input() checkboxString: string;
  @Input() checkedString: string;
  @Input() unCheckedString: string;

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
