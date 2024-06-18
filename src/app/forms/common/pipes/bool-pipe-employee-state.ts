import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'boolPipeEmployee' })
export class BoolPipeEmployee implements PipeTransform {
  transform(value: boolean, yesNo: string) : any {
    return value === false ? 'YES' : 'NO';
  }
}