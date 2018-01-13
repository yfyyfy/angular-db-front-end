import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyString'
})
export class EmptyStringPipe implements PipeTransform {

  transform(value: any): string {
    if (value == null || value === '') {
      return '-';
    } else {
      return value;
    }
  }

}
