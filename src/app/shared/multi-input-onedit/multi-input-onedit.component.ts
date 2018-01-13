import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const MULTI_INPUT_ONEDIT_COMPONENT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiInputOneditComponent),
  multi: true
};

@Component({
  selector: 'app-multi-input-onedit',
  templateUrl: './multi-input-onedit.component.html',
  styleUrls: ['./multi-input-onedit.component.css'],
  providers: [MULTI_INPUT_ONEDIT_COMPONENT_ACCESSOR]
})
export class MultiInputOneditComponent implements ControlValueAccessor {
  @Input() editMode: boolean;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() property: string;
  @Input() source: any[];
  @Input() modelClass: new() => Object;

  // The internal data model
  private innerValue: any = '';
  private innerVirtualValue: string[] = null; // Used when modelClass and property are set.

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // get/set accessor
  get value(): any {
    if (this.property != null) {
      return this.virtualValue;
    } else {
      return this.innerValue;
    }
  };

  set value(v: any) {
    if (v !== this.innerValue) {
    if (this.property != null) {
      this.virtualValue = v;
    } else {
      this.innerValue = v;
    }
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

  // Custom functions
  range(n:number): number[] {
    return Array.from(Array(n).keys());
  }

  // Custom get/set accessor
  get virtualValue(): any {
    if (this.innerVirtualValue == null && this.innerValue != null) {
      this.innerVirtualValue = this.innerValue.map(e => e[this.property]);
    }

    if (this.innerVirtualValue != null) {
      var self = this;
      this.innerVirtualValue.forEach(function(val, idx) {
        if (self.innerValue.length < idx) {
          self.innerValue[idx][self.property] = val;
        } else {
          self.innerValue[idx] = new self.modelClass();
          self.innerValue[idx][self.property] = val;
        }
      });
    }

    return this.innerVirtualValue;
  };

  set virtualValue(v: any) {
    if (v !== this.innerVirtualValue) {
      this.innerVirtualValue = v;
      this.onChangeCallback(v);
    }
  }
}
