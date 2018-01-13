import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const MULTI_CHECKBOX_COMPONENT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiCheckboxComponent),
  multi: true
};

@Component({
  selector: 'app-multi-checkbox',
  templateUrl: './multi-checkbox.component.html',
  styleUrls: ['./multi-checkbox.component.css'],
  providers: [MULTI_CHECKBOX_COMPONENT_ACCESSOR]
})
export class MultiCheckboxComponent implements ControlValueAccessor {
  @Input() contents: any;

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

  get contentsKeys(): string[] {
    return Object.keys(this.contents);
  }

  // Custom function
  update($event: any): void {
    this.innerValue = this.innerValue.filter(elt => elt !== $event.target.value);
    if ($event.target.checked) {
      this.innerValue.push($event.target.value);
    }
    this.onChangeCallback(this.innerValue);
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
