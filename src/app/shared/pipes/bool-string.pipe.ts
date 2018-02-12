import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolString'
})
export class BoolStringPipe implements PipeTransform {

  transform(value: boolean, trueString: string, falseString: string, nullString: string, undefinedString: string): string {
    if (undefinedString != null) {
      if (typeof(value) === 'undefined') {
        return undefinedString;
      }
    }

    if (nullString != null) {
      if (value == null) {
        return nullString;
      }
    }

    return value ? trueString : falseString;
  }
}
